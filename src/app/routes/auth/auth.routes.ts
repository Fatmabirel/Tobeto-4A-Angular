import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPanelPageComponent } from './admin-panel-page/admin-panel-page.component';
import { securedRouteGuard } from '../../../core/auth/guards/secured-route.guard';
import { MyAccountPageComponent } from './my-account-page/my-account-page.component';

export const authRoutes: Routes = [
  {
    path: 'auth/login', // localhost:4200/auth/login
    component: LoginPageComponent,
  },
  {
    path: 'admin-panel',
    canActivate: [securedRouteGuard],
    component: AdminPanelPageComponent,
  },
  {
    path: 'my-account',
    canActivate: [securedRouteGuard],
    component: MyAccountPageComponent,
  },
];