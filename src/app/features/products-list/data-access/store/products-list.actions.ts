import { createAction, props } from '@ngrx/store';
import { Product } from '../models';
import { List, PagingParams } from '@/core/api';

export const loadProducts = createAction(
  '[Products List] Load Products',
  props<{ params: PagingParams }>()
);

export const loadProductsSuccess = createAction(
  '[Products List] Load Products Success',
  props<{ data: List<Product>; params: PagingParams }>()
);

export const loadProductsFailure = createAction(
  '[Products List] Load Products Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Products List] Clear Error');

