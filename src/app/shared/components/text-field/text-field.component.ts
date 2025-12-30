import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldErrorsComponent } from '../field-errors/field-errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-text-field',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FieldErrorsComponent,
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
  form: FormGroup = new FormGroup({
    input: new FormControl(),
  });
  formControl!: AbstractControl;
  controlName!: string;
  onChanged!: (value: string) => {};
  onTouched!: () => {};
  placeholder = input<string>('');
  label = input<string>('');
  type = input<string>('text');
  required = input<boolean>(false);

  get input(): AbstractControl {
    return this.form.get('input')!;
  }

  ngOnInit(): void {
    this.getFormControl();
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
    this.formControl = formDirective.form.controls[this.controlName];
  }
}
