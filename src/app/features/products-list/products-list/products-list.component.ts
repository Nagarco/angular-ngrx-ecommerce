import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../data-access';
import { ProductComponent } from '../components';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  products = signal<Product[]>([
    {
    id: '1',
    name: 'Product 1',
    price: 100,
    imageUrl: 'https://placehold.co/600x400',
    brand: 'Brand 1',
    category: 'Category 1',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
    brand: 'Brand 2',
    category: 'Category 2',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 300,
    imageUrl: 'https://placehold.co/600x400',
    brand: 'Brand 3',
    category: 'Category 3',
  }
]);
}

