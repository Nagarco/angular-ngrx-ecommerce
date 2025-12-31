import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Store } from '@ngrx/store';
import * as AuthActions from '@/store/auth';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, CommonModule, BreadcrumbComponent, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private store = inject(Store);

  navbarOptions = [
    {
      label: 'Logout',
      value: NavbarActions.LOGOUT
    }
  ];

  onDropdownChange(action: string): void {
    switch(action) {
      case NavbarActions.LOGOUT:
        this.store.dispatch(AuthActions.logout());
        break;
    }
  }
}

enum NavbarActions {
  LOGOUT = 'logout'
}