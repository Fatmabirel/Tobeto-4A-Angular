import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from "./shared/components/basic-layout/basic-layout.component";

// Component: Angular tarafında bir görünüm ve işlev için küçük parçalardır.
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule, RouterModule, BasicLayoutComponent]
})
export class AppComponent {
  
}
