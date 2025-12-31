import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsListComponent } from '@/features/products-list';

@Component({
  selector: 'app-landing',
  imports: [TranslateModule, ProductsListComponent],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
}

