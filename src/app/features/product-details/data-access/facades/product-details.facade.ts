import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models';
import * as ProductDetailsActions from '../store/product-details.actions';
import * as ProductDetailsSelectors from '../store/product-details.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsFacade {
  private store = inject(Store);

  product$: Observable<ProductDetails | null> = this.store.select(ProductDetailsSelectors.selectProduct);
  isLoading$: Observable<boolean> = this.store.select(ProductDetailsSelectors.selectIsLoading);
  error$: Observable<string | null> = this.store.select(ProductDetailsSelectors.selectError);

  loadProduct(id: string): void {
    this.store.dispatch(ProductDetailsActions.loadProductDetails({ id }));
  }

  clearError(): void {
    this.store.dispatch(ProductDetailsActions.clearError());
  }
}
