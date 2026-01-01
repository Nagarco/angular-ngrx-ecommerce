import { createAction, props } from '@ngrx/store';
import { Product } from '@/features/products-list/data-access';
import { CartItem } from '../models';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity?: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: string }>()
);

export const decrementQuantity = createAction(
  '[Cart] Decrement Quantity',
  props<{ productId: string }>()
);


export const loadCart = createAction('[Cart] Load Cart');


export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);


export const saveCartSuccess = createAction(
  '[Cart] Save Cart Success'
);

export const saveCartFailure = createAction(
  '[Cart] Save Cart Failure',
  props<{ error: string }>()
);