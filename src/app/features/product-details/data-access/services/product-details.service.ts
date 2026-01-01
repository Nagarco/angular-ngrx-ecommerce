import { inject, Injectable } from "@angular/core";
import { ProductDetailsRepository } from "../repository";
import { ProductDetails } from "../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductDetailsService {
   private productDetailsRepository = inject(ProductDetailsRepository);

   getProductDetails(id: string): Observable<ProductDetails> {
    return this.productDetailsRepository.getProductDetails(id);
   }
}