import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductDetailsFacade } from '../data-access';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addToCart } from '@/features/cart/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './product-details.page.html',
  styleUrl: './product-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsPage implements OnInit {
  private productDetailsFacade = inject(ProductDetailsFacade);
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  productDetails$ = this.productDetailsFacade.product$;
  quantity = signal(1);

  ngOnInit(): void {
    this.productDetailsFacade.loadProduct(this.route.snapshot.params['id']);
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  onAddToCart(): void {
    this.productDetails$.pipe(take(1)).subscribe(product => {
      if (product) {
        this.store.dispatch(addToCart({ product, quantity: this.quantity() }));
      }
    });
  }
}
