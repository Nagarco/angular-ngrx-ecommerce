import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductDetailsState } from './product-details.state';

export const selectProductDetailsState = createFeatureSelector<ProductDetailsState>('productDetails');

export const selectProduct = createSelector(
  selectProductDetailsState,
  (state: ProductDetailsState) => state.product
);

export const selectIsLoading = createSelector(
  selectProductDetailsState,
  (state: ProductDetailsState) => state.isLoading
);

export const selectError = createSelector(
  selectProductDetailsState,
  (state: ProductDetailsState) => state.error
);
