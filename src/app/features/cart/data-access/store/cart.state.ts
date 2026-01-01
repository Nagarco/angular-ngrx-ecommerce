import { CartItem } from '../models';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

