import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PagingParams } from '../api';
import { PageEvent } from '@angular/material/paginator';

export abstract class BaseListFacade<T> {
  protected store = inject(Store);

  abstract isLoading$: Observable<boolean>;
  abstract error$: Observable<string | null>;
  abstract items$: Observable<T[]>;
  abstract total$: Observable<number>;
  abstract pageSize$: Observable<number>;
  abstract currentPage$: Observable<number>;
  abstract pageIndex$: Observable<number>;
  abstract clearError(): void;
  abstract loadItems(params: PagingParams): void;
  abstract onPageChange(event: PageEvent): void;
}

