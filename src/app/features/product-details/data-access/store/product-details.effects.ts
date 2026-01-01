import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ProductDetailsActions from './product-details.actions';
import { ProductDetailsService } from '../services/product-details.service';

@Injectable()
export class ProductDetailsEffects {
  private actions$ = inject(Actions);
  private productDetailsService = inject(ProductDetailsService);

  loadProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailsActions.loadProductDetails),
      switchMap(({ id }) =>
        this.productDetailsService.getProductDetails(id).pipe(
          map((product) =>
            ProductDetailsActions.loadProductDetailsSuccess({ product })
          ),
          catchError((error: any) =>
            of(
              ProductDetailsActions.loadProductDetailsFailure({
                error: error?.message || 'Failed to load product details. Please try again.',
              })
            )
          )
        )
      )
    )
  );
}
