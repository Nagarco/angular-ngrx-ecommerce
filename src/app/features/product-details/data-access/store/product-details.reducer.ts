import { createReducer, on } from '@ngrx/store';
import { initialProductDetailsState } from './product-details.state';
import * as ProductDetailsActions from './product-details.actions';

export const productDetailsReducer = createReducer(
  initialProductDetailsState,

  on(ProductDetailsActions.loadProductDetails, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ProductDetailsActions.loadProductDetailsSuccess, (state, { product }) => ({
    ...state,
    product,
    isLoading: false,
    error: null,
  })),

  on(ProductDetailsActions.loadProductDetailsFailure, (state, { error }) => ({
    ...state,
    product: null,
    isLoading: false,
    error,
  })),

  on(ProductDetailsActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
