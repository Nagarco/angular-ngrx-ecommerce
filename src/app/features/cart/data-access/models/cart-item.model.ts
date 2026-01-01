import { Product } from '@/features/products-list/data-access';

export interface CartItem {
  product: Product;
  quantity: number;
}

