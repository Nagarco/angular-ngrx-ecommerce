import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../data-access';
import { AvatarComponent } from '@/shared/components';
import { Store } from '@ngrx/store';
import * as CartActions from '@/features/cart/data-access';
import { RouterLink } from '@angular/router';
import { FeaturesRoutes } from '@/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, AvatarComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  private store = inject(Store);
  protected readonly FeaturesRoutes = FeaturesRoutes;
  product = input.required<Product>();

  onAddToCart(): void {
    this.store.dispatch(CartActions.addToCart({ product: this.product() }));
  }
}

