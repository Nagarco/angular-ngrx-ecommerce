import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../data-access';
import { ProductComponent } from '../components';
import * as ProductsListActions from '../data-access/store/products-list.actions';
import * as ProductsListSelectors from '../data-access/store/products-list.selectors';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  private store = inject(Store);
  products$: Observable<Product[]> = this.store.select(ProductsListSelectors.selectProducts);
  isLoading$: Observable<boolean> = this.store.select(ProductsListSelectors.selectIsLoading);
  error$: Observable<string | null> = this.store.select(ProductsListSelectors.selectError);

  ngOnInit(): void {
    this.store.dispatch(
      ProductsListActions.loadProducts({
        params: { page: 1, size: 5 },
      })
    );
  }
}

