import { Routes } from '@angular/router';
import { FeaturesRoutes } from '@/common';
import { authGuard, guestGuard } from './core/guards';

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
    loadChildren: () =>
      import('./features/landing/routes').then((m) => m.LANDING_ROUTES),
  },
];
