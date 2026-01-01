import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);


export const selectCartItemByProductId = (productId: string) => createSelector(
  selectCartItems,
  (items) => items.find(item => item.product.id === productId)
);

export const selectIsProductInCart = (productId: string) => createSelector(
  selectCartItems,
  (items) => items.some(item => item.product.id === productId)
);

