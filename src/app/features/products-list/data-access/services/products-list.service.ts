import { inject, Injectable } from "@angular/core";
import { ProductsListRepository } from "../repository";
import { Product } from "../models";
import { List } from "@/core/api";
import { Observable } from "rxjs";
import { ProductsFilter } from "../interfaces";

@Injectable({
    providedIn: 'root',
})
export class ProductsListService {
    private productsListRepository = inject(ProductsListRepository);

    getProducts(params: ProductsFilter): Observable<List<Product>> {
        return this.productsListRepository.getProducts(params);
    }
}