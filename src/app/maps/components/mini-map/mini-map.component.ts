import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [],
  templateUrl: './mini-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniMapComponent { }
