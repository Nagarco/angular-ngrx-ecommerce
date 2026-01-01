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
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: FeaturesRoutes.Landing.path,
        loadChildren: () =>
          import('./features/landing').then((m) => m.LANDING_ROUTES),
      },
      {
        path: FeaturesRoutes.Cart.path,
        loadChildren: () =>
          import('./features/cart').then((m) => m.CART_ROUTES),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: FeaturesRoutes.Landing.path,
  },
];
