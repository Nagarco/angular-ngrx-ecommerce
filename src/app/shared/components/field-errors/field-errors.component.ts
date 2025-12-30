import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-field-errors',
  imports: [CommonModule, TranslateModule, MatInputModule],
  templateUrl: './field-errors.component.html',
  styleUrl: './field-errors.component.scss',
})
export class FieldErrorsComponent {
  controlName = input.required<string>();
  errors = input.required<ValidationErrors | null>();
  errorMessages = computed(() => {
    const errors = this.errors();
    if (!errors) return [];
    return Object.keys(errors).map((key) => {
      return {
        key,
        params: {
          ...errors[key],
          field: this.controlName(),
        },
      };
    });
  });
}
