import { Routes } from '@angular/router';
import { FeaturesRoutes } from '@/common';

export const routes: Routes = [
  {
    path: FeaturesRoutes.Auth.path,
    canActivate: [],
    loadChildren: () =>
      import('./features/auth/routes').then((m) => m.AUTH_ROUTES),
  },
];
