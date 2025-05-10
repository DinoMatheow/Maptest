
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-fullscream-map-page',
  standalone: true,
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscream-map-page.component.html',
  styles:`
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

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreamMapPageComponent implements AfterViewInit  {
  map = signal<mapboxgl.Map | null>(null);
  zoom = signal(14);
  coordinates= signal({
    lng: -74.5,
    lat: 40,
  });



zoomEffect = effect(()=>{
  if(!this.map()) return ;
  this.map()?.setZoom(this.zoom());

})

  divElement = viewChild<ElementRef>('map');


  async ngAfterViewInit(){
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80 ))


    const element = this.divElement()!.nativeElement;
    console.log(element);

    const {lng, lat} = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

this.mapListeners(map);


  }

mapListeners(map: mapboxgl.Map){


map.on('zoomend', (event) => {
  const newZoom = event.target.getZoom();
  this.zoom.set(newZoom);
})

map.on('moveend', ()=>{
  const center = map.getCenter();
  this.coordinates.set(center);
})

map.once('load', () => {
  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.NavigationControl());
  this.map.set(map);
});

}





}
