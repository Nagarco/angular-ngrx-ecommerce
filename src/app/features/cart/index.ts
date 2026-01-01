import { Route } from '@angular/router';

export const CART_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
    data: {
      breadcrumb: 'Cart',
    },
  },
];