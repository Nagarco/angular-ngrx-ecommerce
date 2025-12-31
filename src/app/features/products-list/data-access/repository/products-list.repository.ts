import { HttpService, List, Mapper, PagingParams } from '@/core/api';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductsListEndPoints } from '../endpoints';
import { Product } from '../models';
import { ProductsFilter } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsListRepository {
  private http = inject(HttpService);
  private mapper = inject(Mapper);

  getProducts(params: ProductsFilter): Observable<List<Product>> {
    const httpParams = this.http.setQueryParams(params);
    return this.http.get(ProductsListEndPoints.GetProducts.url(), { params: httpParams }).pipe(
      map((res: any) => {
        const data = {
          items: this.mapper.fromListJson(Product, res.items),
          total: res.total,
        };
        return data;
      })
    );
  }
}
