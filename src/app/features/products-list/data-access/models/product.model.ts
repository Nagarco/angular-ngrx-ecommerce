import { Expose } from "class-transformer";

export class Product {
  @Expose() id!: string;
  @Expose() productName!: string;
  @Expose() description!: string;
  @Expose() quantity!: number;
  @Expose() imageUrl!: string;
  @Expose() price!: number;
  @Expose() brandName!: string;
}
