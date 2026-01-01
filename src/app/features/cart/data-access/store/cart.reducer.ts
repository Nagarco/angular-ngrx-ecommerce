import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, { product, quantity }],
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.product.id !== productId),
  })),

  on(CartActions.decrementQuantity, (state, { productId }) => {
    const existingItem = state.items.find(
      (item) => item.product.id === productId
    );

    if (!existingItem) {
      return state;
    }

    if (existingItem.quantity <= 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== productId),
      };
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    };
  }),

  on(CartActions.loadCart, (state) => ({
    ...state,
    error: null,
  })),

  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    error: null,
  })),

  on(CartActions.saveCartSuccess, (state) => ({
    ...state,
    error: null,
  }))
);
