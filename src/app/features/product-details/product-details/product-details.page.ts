import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductDetailsFacade } from '../data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.page.html',
  styleUrl: './product-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsPage implements OnInit {
  private productDetailsFacade = inject(ProductDetailsFacade);
  private route = inject(ActivatedRoute);
  productDetails$ = this.productDetailsFacade.product$;

  ngOnInit(): void {
    this.productDetailsFacade.loadProduct(this.route.snapshot.params['id']);
  }
}
