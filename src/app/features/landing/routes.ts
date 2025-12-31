import { FeaturesRoutes } from '@/common';
import { Route } from '@angular/router';

export const LANDING_ROUTES: Route[] = [
  {
    path: FeaturesRoutes.Landing.path,
    loadComponent: () => import('./landing.page').then((m) => m.LandingPage),
    data: {
      breadcrumb: 'Home',
    },
  },
];
