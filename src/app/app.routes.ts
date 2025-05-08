import { Routes } from '@angular/router';
import { FullscreamMapPageComponent } from './pages/fullscream-map-page/fullscream-map-page.component';
import { HousesPagesComponent } from './pages/houses-pages/houses-pages.component';
import { MakersPageComponent } from './pages/makers-page/makers-page.component';

export const routes: Routes = [
  {
    path:'fullscream',
    component: FullscreamMapPageComponent,
    title: 'Fullscream Map',
  },
  {
    path:'houses',
    component: HousesPagesComponent,
    title: 'Houses - proporty',
  },
  {
    path:'makers',
    component: MakersPageComponent,
    title: 'Makers',
  },
  {
    path:'**',
    redirectTo: 'fullscream',
  },
];
