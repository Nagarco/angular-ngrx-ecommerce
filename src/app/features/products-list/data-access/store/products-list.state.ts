import { Product } from '../models';
import { ProductsFilter } from '../interfaces';

export interface ProductsListState {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  limit: number;
  filters: ProductsFilter;
}

export const initialProductsListState: ProductsListState = {
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  currentPage: 0,
  limit: 10,
  filters: {},
};

