import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartFacade, CartItem } from '../data-access';
import { CartTableComponent } from '../components';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatButtonModule, MatIconModule, CartTableComponent],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  private facade = inject(CartFacade);

  items$: Observable<CartItem[]> = this.facade.items$;
  itemsCount$: Observable<number> = this.facade.itemsCount$;
  total$: Observable<number> = this.facade.total$;

  onIncrement(item: CartItem): void {
    this.facade.addToCart(item.product, 1);
  }

  onDecrement(productId: string): void {
    this.facade.decrementQuantity(productId);
  }

  onRemove(productId: string): void {
    this.facade.removeFromCart(productId);
  }

  onClearCart(): void {
    this.facade.clearCart();
  }
}
