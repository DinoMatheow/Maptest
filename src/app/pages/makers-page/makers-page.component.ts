import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-makers-page',
  standalone: true,
  imports: [],
  templateUrl: './makers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakersPageComponent { }
