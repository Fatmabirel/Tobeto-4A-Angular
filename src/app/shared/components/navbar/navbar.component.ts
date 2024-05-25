import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  displayUserName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.displayUserName = isLogged
        ? this.authService.tokenPayload!.userName
        : null;
    });
  }

}
