import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldComponent } from '@/shared/components';
import { ProductsListFacade } from '../../data-access';
import { ProductsFilter } from '../../data-access/interfaces';

@Component({
  selector: 'app-products-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextFieldComponent,
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterComponent {
  facade = inject(ProductsListFacade);

  form = new FormGroup({
    productName: new FormControl(''),
    brandName: new FormControl(''),
  });

  onApply(): void {
    const filters: ProductsFilter = {
      productName: this.form.value.productName?.trim() || undefined,
      brandName: this.form.value.brandName?.trim() || undefined,
    };
    this.facade.applyFilters(filters);
  }

  onReset(): void {
    this.form.reset();
    this.facade.resetFilters();
  }
}

