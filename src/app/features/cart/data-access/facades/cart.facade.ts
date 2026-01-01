import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '@/features/products-list/data-access';
import { CartItem } from '../models';
import * as CartActions from '../store/cart.actions';
import * as CartSelectors from '../store/cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private store = inject(Store);

  items$: Observable<CartItem[]> = this.store.select(CartSelectors.selectCartItems);
  itemsCount$: Observable<number> = this.store.select(CartSelectors.selectCartItemsCount);
  total$: Observable<number> = this.store.select(CartSelectors.selectCartTotal);

  loadCart(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.store.dispatch(CartActions.addToCart({ product, quantity }));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  isProductInCart(productId: string): Observable<boolean> {
    return this.store.select(CartSelectors.selectIsProductInCart(productId));
  }
}

