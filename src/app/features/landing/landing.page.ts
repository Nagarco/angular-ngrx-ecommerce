import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '@/store/auth';
import { NavbarComponent } from '@/shared/components';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, TranslateModule, NavbarComponent],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  private store = inject(Store);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

