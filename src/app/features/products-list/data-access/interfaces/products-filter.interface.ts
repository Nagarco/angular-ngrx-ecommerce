import { PagingParams } from "@/core/api";

export interface ProductsFilter extends Partial<PagingParams> {
    brandName?: string;
    productName?: string;
}

