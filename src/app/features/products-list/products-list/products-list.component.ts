import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../data-access';
import { ProductCardComponent, ProductsFilterComponent } from '../components';
import { ProductsListFacade } from '../data-access';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent, ProductsFilterComponent, MatPaginatorModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  facade = inject(ProductsListFacade);

  isLoading$: Observable<boolean> = this.facade.isLoading$;
  error$: Observable<string | null> = this.facade.error$;
  products$: Observable<Product[]> = this.facade.items$;
  total$: Observable<number> = this.facade.total$;
  pageSize$: Observable<number> = this.facade.pageSize$;
  pageIndex$: Observable<number> = this.facade.pageIndex$;

  ngOnInit(): void {
    this.facade.loadItems({ page: 1, size: 5 });
  }

  onPageChange(event: PageEvent): void {
    this.facade.onPageChange(event);
  }
}

