import { RouteConfig } from "@/common";

export class ProductDetailsEndPoints {
    static GetProductDetails = new RouteConfig<{ id: string }>('products/:id');
}