import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { title } from 'process';
import { Router } from 'express';
import { tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {


  router = inject(Router)

routes = routes.map((route)=> ({
  path: route.path,
  title: `${route.title ?? 'Maps in Angular'}`
}));

pageTitle$ = this.router.events.pipe(
  tap((event)=> console.log(event)

));

}
