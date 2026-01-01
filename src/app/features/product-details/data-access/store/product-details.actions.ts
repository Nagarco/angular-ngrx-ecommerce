import { createAction, props } from '@ngrx/store';
import { ProductDetails } from '../models';

export const loadProductDetails = createAction(
  '[Product Details] Load Product Details',
  props<{ id: string }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Product Details] Load Product Details Success',
  props<{ product: ProductDetails }>()
);

export const loadProductDetailsFailure = createAction(
  '[Product Details] Load Product Details Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Product Details] Clear Error');
