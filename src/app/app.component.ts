import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BasicLayoutComponent } from "./shared/components/basic-layout/basic-layout.component";

// Component: Angular tarafında bir görünüm ve işlev için küçük parçalardır.
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,RouterModule]
})
export class AppComponent {
  
}
