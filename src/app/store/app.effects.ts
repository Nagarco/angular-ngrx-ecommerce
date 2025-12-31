import { AuthEffects } from './auth';
import { ProductsListEffects } from '../features/products-list/data-access/store';

export const appEffects = [
  AuthEffects,
  ProductsListEffects,
];

