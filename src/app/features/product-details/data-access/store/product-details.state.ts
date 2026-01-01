import { ProductDetails } from '../models';

export interface ProductDetailsState {
  product: ProductDetails | null;
  isLoading: boolean;
  error: string | null;
}

export const initialProductDetailsState: ProductDetailsState = {
  product: null,
  isLoading: false,
  error: null,
};
