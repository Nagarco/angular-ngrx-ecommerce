import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  currentPage: string = '';

  ngOnInit(): void {
    this.currentPage = this.getCurrentPageName();
    this.subscribeToRouteChanges();
  }

  private getCurrentPageName(): string {
    let route = this.activatedRoute;

    const breadcrumb = route.snapshot.data['breadcrumb'];
    if (breadcrumb) {
      return breadcrumb;
    }

    const urlSegments = route.snapshot.url;
    if (urlSegments.length > 0) {
      const lastSegment = urlSegments[urlSegments.length - 1].path;
      return this.formatLabel(lastSegment);
    }

    return '';
  }

  private formatLabel(path: string): string {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private subscribeToRouteChanges(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(() => {
      this.currentPage = this.getCurrentPageName();
    });
  }
}
