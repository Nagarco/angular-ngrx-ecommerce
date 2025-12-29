import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from '@/shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  form = new FormGroup({
    email: new FormControl(),
  });

  submit() {
    console.log(this.form.value);
  }
}
