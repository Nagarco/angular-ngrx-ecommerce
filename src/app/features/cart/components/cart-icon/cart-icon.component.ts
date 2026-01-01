import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FeaturesRoutes } from '@/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatButtonModule, RouterLink],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIconComponent {
  protected readonly FeaturesRoutes = FeaturesRoutes;
  itemCount = input<number>(0);
}

