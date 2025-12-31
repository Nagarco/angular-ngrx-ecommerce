import { Route } from '@angular/router';

export const LANDING_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./landing.page').then((m) => m.LandingPage),
    data: {
      breadcrumb: 'Home',
    },
  },
];
