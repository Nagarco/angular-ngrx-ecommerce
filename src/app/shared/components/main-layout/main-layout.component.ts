import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from '../cart-icon/cart.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Store } from '@ngrx/store';
import * as AuthActions from '@/features/auth/data-access';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, CartComponent, DropdownComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private store = inject(Store);
  headerRef = viewChild<ElementRef>('header');
  spacerRef = viewChild<ElementRef>('spacer');
   navbarOptions = [
    {
      label: 'Logout',
      value: NavbarActions.LOGOUT
    }
  ];


  constructor() {
    effect(() => {
      const header = this.headerRef();
      const spacer = this.spacerRef();
      if (!header || !spacer) return;
      return this.adjustSpacerToNavbar(
        header.nativeElement,
        spacer.nativeElement
      );
    });
  }

  onDropdownChange(action: string): void {
    switch(action) {
      case NavbarActions.LOGOUT:
        this.store.dispatch(AuthActions.logout());
        break;
    }
  }

  private adjustSpacerToNavbar(headerEl: HTMLElement, spacerEl: HTMLElement) {
    const navbar: HTMLElement | null = headerEl.querySelector('mat-toolbar');
    if (!navbar) return;

    const updateSpacer = () => (spacerEl.style.height = navbar.offsetHeight + 'px');
    updateSpacer();

    const observer = new ResizeObserver(updateSpacer);
    observer.observe(navbar);

    return () => observer.disconnect();
  }
}

enum NavbarActions {
  LOGOUT = 'logout'
}
