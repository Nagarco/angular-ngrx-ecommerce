import { Routes } from '@angular/router';
import { FeaturesRoutes } from '@/common';
import { authGuard, guestGuard } from './core/guards';
import { MainLayoutComponent } from './shared/components';

export const routes: Routes = [
  {
    path: FeaturesRoutes.Auth.path,
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: FeaturesRoutes.Landing.path,
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    loadChildren: () =>
      import('./features/landing/routes').then((m) => m.LANDING_ROUTES),
  },
];
