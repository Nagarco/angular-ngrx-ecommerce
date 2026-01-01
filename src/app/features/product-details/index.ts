import { Route } from "@angular/router";

export const PRODUCT_DETAILS_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./product-details/product-details.page').then((m) => m.ProductDetailsPage),
        data: {
            breadcrumb: 'Product Details',
        },
    }
]