import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CartIconComponent } from '@/features/cart/components';
import * as AuthActions from '@/features/auth/data-access';
import { CartFacade } from '@/features/cart/data-access';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, CartIconComponent, DropdownComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private store = inject(Store);
  private cartFacade = inject(CartFacade);
  
  headerRef = viewChild<ElementRef>('header');
  spacerRef = viewChild<ElementRef>('spacer');
  
  cartItemsCount = toSignal(this.cartFacade.itemsCount$, { initialValue: 0 });
  
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
