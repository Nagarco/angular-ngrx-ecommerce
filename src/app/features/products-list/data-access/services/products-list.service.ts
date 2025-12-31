import { inject, Injectable } from "@angular/core";
import { ProductsListRepository } from "../repository";
import { Product } from "../models";
import { List, PagingParams } from "@/core/api";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductsListService {
    private productsListRepository = inject(ProductsListRepository);

    getProducts(params: PagingParams): Observable<List<Product>> {
        return this.productsListRepository.getProducts(params);
    }
}