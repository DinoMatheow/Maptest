import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxkey;

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

  const maker = new mapboxgl.Marker({
    draggable: false,
    color: 'red',
  })
  .setLngLat([-77.07311, -12.02353])
  .addTo(map);

map.on('dragend', (event)=> {
  console.log(event);
})


this.mapListeners(map);

}

mapListeners(map: mapboxgl.Map){
  console.log('object')
}



}
