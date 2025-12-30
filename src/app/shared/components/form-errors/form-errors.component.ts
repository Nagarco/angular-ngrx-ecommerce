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
  selector: 'app-form-errors',
  imports: [CommonModule, TranslateModule, MatInputModule],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent {
  errors = input.required<ValidationErrors | null>();
  errorMessages = computed(() => {
    const errors = this.errors();
    if (!errors) return [];
    return Object.keys(errors).map((key) => ({
      key,
      params: errors[key],
    }));
  });
}
