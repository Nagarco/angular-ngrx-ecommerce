import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '@/shared/components';
import { CartItem } from '../../data-access';

@Component({
  selector: 'app-cart-table',
  imports: [CommonModule, MatButtonModule, MatIconModule, AvatarComponent],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTableComponent {
  items = input.required<CartItem[]>();

  incrementQuantity = output<CartItem>();
  decrementQuantity = output<string>();
  removeItem = output<string>();

  getLineTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  onIncrement(item: CartItem): void {
    this.incrementQuantity.emit(item);
  }

  onDecrement(productId: string): void {
    this.decrementQuantity.emit(productId);
  }

  onRemove(productId: string): void {
    this.removeItem.emit(productId);
  }
}

