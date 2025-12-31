import { createAction, props } from '@ngrx/store';
import { Product } from '../models';
import { List, PagingParams } from '@/core/api';
import { ProductsFilter } from '../interfaces';

export const loadProducts = createAction(
  '[Products List] Load Products',
  props<{ params: ProductsFilter }>()
);

export const loadProductsSuccess = createAction(
  '[Products List] Load Products Success',
  props<{ data: List<Product>; params: ProductsFilter }>()
);

export const loadProductsFailure = createAction(
  '[Products List] Load Products Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Products List] Clear Error');



export const setFilters = createAction(
  '[Products List] Set Filters',
  props<{ filters: ProductsFilter }>()
);

export const clearFilters = createAction('[Products List] Clear Filters');