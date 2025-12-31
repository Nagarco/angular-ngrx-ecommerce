import { FeaturesRoutes } from '@/common';
import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: FeaturesRoutes.Login.path,
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },
];
