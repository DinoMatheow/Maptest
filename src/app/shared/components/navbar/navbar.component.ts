import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';

import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HousesPagesComponent } from '../../../pages/houses-pages/houses-pages.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {


  router = inject(Router)

routes = routes.map((route)=> ({
  path: route.path,
  title: `${route.title ?? 'Maps in Angular'}`
}))
.filter((route)=> route.path != '**')
;



pageTitle$ = this.router.events.pipe(
  filter((event) =>event instanceof NavigationEnd),
  tap((event)=> console.log(event)),
  map((event) => event.url),
  map(url => routes.find( route => `/${ route.path}` === url )?.title ?? 'Mapas'

));



}
