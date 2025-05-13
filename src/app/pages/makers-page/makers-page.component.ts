import { UUIDTypes } from './../../../../node_modules/uuid/dist/cjs-browser/types.d';

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';

import {v4 as UUIDv4} from 'uuid';
import { filter } from 'rxjs';

mapboxgl.accessToken = environment.mapboxkey;

interface Marker{
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-makers-page',
  standalone: true,
  imports: [],
  templateUrl: './makers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([])

  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80 ));


    const element = this.divElement()!.nativeElement;
    console.log(element);

    // const {lng, lat} = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-77.07311, -12.02353], // starting position [lng, lat]
      zoom: 9, // starting zoom
  });

//   const maker = new mapboxgl.Marker({
//     draggable: false,
//     color: 'red',
//   })
//   .setLngLat(event.LngLatBoundsLike)
//   .addTo(map);

// map.on('dragend', (event)=> {
//   console.log(event);
// })


this.mapListeners(map);

}

mapListeners(map: mapboxgl.Map){
map.on('click', (event)=> this.mapClick(event));

this.map.set(map);

}

mapClick(event: mapboxgl.MapMouseEvent){
  if(!this.map()) return ;
  // console.log(event.lngLat)

  const coords = event.lngLat;
const map = this.map()!;

const color = '#xxxxxx'.replace(/x/g, (y)=>
((Math.random() * 16) | 0).toString(16)
);

  const marker = new mapboxgl.Marker({
    color: color,
  })
  .setLngLat(coords)
  .addTo(map);


const newMarker: Marker = {
  id: UUIDv4(),
  mapboxMarker: marker,
};

this.markers.update((markers) => [newMarker, ...markers]);

console.log(this.markers());



}



flyToMarker(lngLat: LngLatLike){

if(!this.map()) return;

this.map()?.flyTo({
  center: lngLat,
})


}



deletemarker(marker: Marker){
if (!this.markers()) return;

const map = this.map()!;
marker.mapboxMarker.remove();

this.markers.set(this.markers().filter(m=> m.id != marker.id))

}










}
