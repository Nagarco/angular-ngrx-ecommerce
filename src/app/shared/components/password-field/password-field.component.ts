import { Component, input, signal } from '@angular/core';
import { TextFieldComponent } from '../text-field/text-field.component';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-password-field',
  imports: [TextFieldComponent, ReactiveFormsModule, MatIcon],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class PasswordFieldComponent {
  passwordFormControlName = input<string>();
  label = input<string>('');
  placeholder = input<string>('');
  showPassword = signal<boolean>(false);

  togglePassword(): void {
    this.showPassword.update((prev) => !prev);
  }
}
