import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingParams } from '@/core/api';
import { BaseListFacade } from '../../../../core/facades';
import { Product } from '../models';
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

  loadItems(params: PagingParams): void {
    this.store.dispatch(ProductsListActions.loadProducts({ params }));
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    this.loadItems({ page, size });
  }
}

