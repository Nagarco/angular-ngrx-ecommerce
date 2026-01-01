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
import { AuthEffects } from '@/features/auth/data-access';
import { ProductsListEffects } from '@/features/products-list/data-access';
import { CartEffects } from '@/features/cart/data-access';

export interface AppState {
  auth: AuthState;
  productsList: ProductsListState;
  cart: CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  productsList: productsListReducer,
  cart: cartReducer,
};

export const appEffects = [
  AuthEffects,
  ProductsListEffects,
  CartEffects,
];
