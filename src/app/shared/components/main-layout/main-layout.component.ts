import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  headerRef = viewChild<ElementRef>('header');
  spacerRef = viewChild<ElementRef>('spacer');

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
