import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLayoutComponent {
  now = new Date();
}