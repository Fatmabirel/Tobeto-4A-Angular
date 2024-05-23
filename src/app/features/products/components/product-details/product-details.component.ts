import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductDetail } from '../../models/product-detail';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { VatPipe } from '../../pipes/vat.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { AppButtonDirective } from '../../directives/appButton.directive';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    PlaceholderComponent,
    ButtonComponent,
    VatPipe,
    AppButtonDirective,
    HighlightDirective,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  @Input() id!: number;
  product!: ProductDetail;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.productsService.getById(this.id).subscribe((product) => {
      this.product = product;
      this.change.markForCheck();
    });
  }

  onAddToCard() {}
}
