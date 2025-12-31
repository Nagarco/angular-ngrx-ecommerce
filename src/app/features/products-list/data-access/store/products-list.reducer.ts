import { createReducer, on } from '@ngrx/store';
import { initialProductsListState } from './products-list.state';
import * as ProductsListActions from './products-list.actions';

export const productsListReducer = createReducer(
  initialProductsListState,

  on(ProductsListActions.loadProducts, (state, { params }) => ({
    ...state,
    isLoading: true,
    error: null,
    currentPage: params.page || 1,
    limit: params.size || 5,
    filters: params || state.filters,
  })),

  on(ProductsListActions.loadProductsSuccess, (state, { data, params }) => ({
    ...state,
    products: data.items,
    total: data.total,
    isLoading: false,
    error: null,
    currentPage: params.page || 1,
    limit: params.size || 5,
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
  })),

  

  on(ProductsListActions.setFilters, (state, { filters }) => ({
    ...state,
    filters,
  })),

  on(ProductsListActions.clearFilters, (state) => ({
    ...state,
    filters: {},
  })),
);
