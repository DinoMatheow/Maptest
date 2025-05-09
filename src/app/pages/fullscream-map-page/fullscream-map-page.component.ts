import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environments.development';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-fullscream-map-page',
  standalone: true,
  imports: [],
  templateUrl: './fullscream-map-page.component.html',
  styles:`
  div {
    width: 100vw;
    height: calc(100vh -64px);
    background-color: red;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreamMapPageComponent implements AfterViewInit  {
  divElement = viewChild<ElementRef>('map');


  async ngAfterViewInit(){
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 2000 ))


    const element = this.divElement()!.nativeElement;
    console.log(element);


    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }






}
