import { createReducer, on } from '@ngrx/store';
import { initialProductsListState } from './products-list.state';
import * as ProductsListActions from './products-list.actions';

export const productsListReducer = createReducer(
  initialProductsListState,

  on(ProductsListActions.loadProducts, (state, { params }) => ({
    ...state,
    isLoading: true,
    error: null,
    currentPage: params.page,
    limit: params.size,
  })),

  on(ProductsListActions.loadProductsSuccess, (state, { data, params }) => ({
    ...state,
    products: data.items,
    total: data.total,
    isLoading: false,
    error: null,
    currentPage: params.page,
    limit: params.size,
  })),

  on(ProductsListActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    products: [],
    total: 0,
  })),

  on(ProductsListActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);

