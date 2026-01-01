import { Expose, Type } from "class-transformer";

export class ProductDetails {
    @Expose() id!: string;
    @Expose() productName!: string; 
    @Expose() description!: string;
    @Expose() quantity!: number;
    @Expose() imageUrl!: string;
    @Expose() price!: number;
    @Expose() brandName!: string;
    @Expose() recommendedProducts!: ProductDetails[];
}