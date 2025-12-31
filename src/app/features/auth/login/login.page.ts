import {
  PasswordFieldComponent,
  TextFieldComponent,
} from '@/shared/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import * as AuthActions from '@/features/auth/data-access';
import * as AuthSelectors from '@/features/auth/data-access/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    TextFieldComponent,
    PasswordFieldComponent,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private store = inject(Store);
  isLoading$: Observable<boolean> = this.store.select(
    AuthSelectors.selectIsLoading
  );

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      AuthActions.login({
        username: this.form.value.username!,
        password: this.form.value.password!,
      })
    );
  }
}
