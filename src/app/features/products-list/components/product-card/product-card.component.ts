import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../data-access';
import { AvatarComponent } from '@/shared/components';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, AvatarComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}

