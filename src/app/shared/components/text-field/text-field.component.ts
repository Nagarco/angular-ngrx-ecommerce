import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-text-field',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  form: FormGroup = new FormGroup({
    input: new FormControl(),
  });
  formControl!: FormControl;
  controlName!: string;
  placeholder = input<string>('');
  label = input<string>('');
  type = input<string>('text');
  errorMessage = signal<any>({ key: null, params: null });
  onChanged: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get input(): FormControl {
    return this.form.get('input') as FormControl;
  }

  ngOnInit(): void {
    this.getFormControl();
    merge(this.formControl?.statusChanges, this.formControl?.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    const errors: ValidationErrors | null = this.formControl?.errors;
    if (!errors) {
      this.errorMessage.set({ key: null, params: null });
      return;
    }
    const firstErrorKey = Object.keys(errors)[0];
    if (!firstErrorKey) return;
    this.errorMessage.set({
      key: firstErrorKey,
      params: {
        ...errors[firstErrorKey],
        field: this.controlName,
      },
    });
  }

  handleInput(event: Event): void {
    const value = event.target as HTMLInputElement;
    this.onChanged(value.value);
  }

  handleTouched(event: Event): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.input.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.input.disable();
      return;
    }
    this.input.enable();
  }

  private getFormControl(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    const formDirective: FormGroupDirective =
      this.injector.get(FormGroupDirective);
    this.controlName = ngControl.name as string;
    this.formControl = formDirective.form.controls[
      this.controlName
    ] as FormControl;
  }
}
