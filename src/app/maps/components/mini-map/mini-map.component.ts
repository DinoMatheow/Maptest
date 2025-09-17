import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: `
  div {
    width: 100%;
    height: 200px;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniMapComponent implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat:number}>();
  zoom = input<number>(14);



  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80 ))


    const element = this.divElement()!.nativeElement;
    console.log(element);



    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
    });

new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);


}




}
