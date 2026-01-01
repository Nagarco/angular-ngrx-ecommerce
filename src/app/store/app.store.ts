import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from '../features/auth/data-access/store';
import {
  ProductsListState,
  productsListReducer,
} from '../features/products-list/data-access/store';
import {
  CartState,
  cartReducer,
} from '../features/cart/data-access/store';
import {
  ProductDetailsState,
  productDetailsReducer,
} from '../features/product-details/data-access/store';
import { AuthEffects } from '@/features/auth/data-access';
import { ProductsListEffects } from '@/features/products-list/data-access';
import { CartEffects } from '@/features/cart/data-access';
import { ProductDetailsEffects } from '@/features/product-details/data-access';

export interface AppState {
  auth: AuthState;
  products: ProductsListState;
  cart: CartState;
  productDetails: ProductDetailsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  products: productsListReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
};

export const appEffects = [
  AuthEffects,
  ProductsListEffects,
  CartEffects,
  ProductDetailsEffects,
];
