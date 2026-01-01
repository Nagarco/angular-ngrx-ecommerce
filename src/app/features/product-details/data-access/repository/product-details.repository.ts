import { HttpService, Mapper } from '@/core/api';
import { inject, Injectable } from '@angular/core';
import { ProductDetailsEndPoints } from '../endpoints';
import { map, Observable } from 'rxjs';
import { ProductDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsRepository {
  private http = inject(HttpService);
  private mapper = inject(Mapper);

  getProductDetails(id: string): Observable<ProductDetails> {
    return this.http
      .get(ProductDetailsEndPoints.GetProductDetails.url({ id }))
      .pipe(map((res: any) => this.mapper.fromJson(ProductDetails, res)));
  }
}
