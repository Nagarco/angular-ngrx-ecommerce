import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsListState } from './products-list.state';

export const selectProductsListState =
  createFeatureSelector<ProductsListState>('productsList');

export const selectProducts = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.products
);

export const selectTotal = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.total
);

export const selectIsLoading = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.isLoading
);

export const selectError = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.error
);

export const selectCurrentPage = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.currentPage
);

export const selectLimit = createSelector(
  selectProductsListState,
  (state: ProductsListState) => state.limit
);

export const selectHasMore = createSelector(
  selectProductsListState,
  (state: ProductsListState) => {
    const totalPages = Math.ceil(state.total / state.limit);
    return state.currentPage < totalPages;
  }
);

