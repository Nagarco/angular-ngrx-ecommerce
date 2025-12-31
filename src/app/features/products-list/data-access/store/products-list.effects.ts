import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ProductsListActions from './products-list.actions';
import { ProductsListService } from '../services/products-list.service';

@Injectable()
export class ProductsListEffects {
  private actions$ = inject(Actions);
  private productsListService = inject(ProductsListService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsListActions.loadProducts),
      switchMap(({ params }) =>
        this.productsListService.getProducts(params).pipe(
          map((data) =>
            ProductsListActions.loadProductsSuccess({ data, params })
          ),
          catchError((error: any) =>
            of(
              ProductsListActions.loadProductsFailure({
                error: error?.message || 'Failed to load products. Please try again.',
              })
            )
          )
        )
      )
    )
  );
}

