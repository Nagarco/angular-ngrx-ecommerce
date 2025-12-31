import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BaseListFacade } from '../../../../core/facades';
import { Product } from '../models';
import { ProductsFilter } from '../interfaces';
import * as ProductsListActions from '../store/products-list.actions';
import * as ProductsListSelectors from '../store/products-list.selectors';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class ProductsListFacade extends BaseListFacade<Product> {
  isLoading$: Observable<boolean> = this.store.select(
    ProductsListSelectors.selectIsLoading
  );

  error$: Observable<string | null> = this.store.select(ProductsListSelectors.selectError);

  items$: Observable<Product[]> = this.store.select(
    ProductsListSelectors.selectProducts
  );

  total$: Observable<number> = this.store.select(
    ProductsListSelectors.selectTotal
  );

  pageSize$: Observable<number> = this.store.select(
    ProductsListSelectors.selectPageSize
  );

  currentPage$: Observable<number> = this.store.select(
    ProductsListSelectors.selectCurrentPage
  );

  pageIndex$: Observable<number> = this.currentPage$.pipe(
    map((page: number) => Math.max(0, page - 1))
  );

  clearError(): void {
    this.store.dispatch(ProductsListActions.clearError());
  }

  filters$: Observable<ProductsFilter> = this.store.select(
    ProductsListSelectors.selectFilters
  );

  loadItems(params: ProductsFilter): void {
    this.store.dispatch(ProductsListActions.loadProducts({ params }));
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    this.store.select(ProductsListSelectors.selectFilters).pipe(take(1)).subscribe(filters => {
      this.loadItems({ ...filters, page, size });
    });
  }

  applyFilters(filters: ProductsFilter): void {
    this.store.dispatch(ProductsListActions.setFilters({ filters }));
    this.store.select(ProductsListSelectors.selectLimit).pipe(take(1)).subscribe(limit => {
      this.loadItems({ ...filters, page: 1, size: limit });
    });
  }

  resetFilters(): void {
    this.store.dispatch(ProductsListActions.clearFilters());
    this.store.select(ProductsListSelectors.selectLimit).pipe(take(1)).subscribe(limit => {
      this.loadItems({ page: 1, size: limit });
    });
  }
}

