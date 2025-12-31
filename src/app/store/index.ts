import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth';
import {
  ProductsListState,
  productsListReducer,
} from '../features/products-list/data-access/store';

export interface AppState {
  auth: AuthState;
  productsList: ProductsListState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  productsList: productsListReducer,
};

export * from './app.effects';