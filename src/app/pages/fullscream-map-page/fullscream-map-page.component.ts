import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, ElementRef, signal, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-fullscream-map-page',
  standalone: true,
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscream-map-page.component.html',
  styles: [`
    div {
      width: 100vw;
      height: calc(100vh - 64px);
      background-color: red;
    }
    #controls{
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0 , 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreamMapPageComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) divElement!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);

  map = signal<mapboxgl.Map | null>(null);
  zoom = signal(14);
  coordinates = signal({ lng: -74.5, lat: 40 });

  // Efecto para actualizar zoom automáticamente
  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });

  async ngAfterViewInit() {
    // Solo en navegador
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.divElement?.nativeElement) return;

    // Espera corta para asegurar que el div se renderizó
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement.nativeElement;
    const { lng, lat } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 9,
    });

    this.mapListeners(map);
  }

  private mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', () => {
      this.zoom.set(map.getZoom());
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set({ lng: center.lng, lat: center.lat });
    });

    map.once('load', () => {
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.NavigationControl());
      this.map.set(map);
    });
  }
}
