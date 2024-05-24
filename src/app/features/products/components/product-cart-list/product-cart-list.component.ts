import { CommonModule } from '@angular/common';
import { ProductListItem } from '../../models/product-list-item';
import { CardComponent } from '../../../../shared/components/card/card.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { take } from 'rxjs';
import { VatPipe } from '../../pipes/vat.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PaginatedList } from '../../../../../core/models/paginated-list';

@Component({
  selector: 'app-product-cart-list',
  standalone: true,
  imports: [CommonModule, CardComponent, VatPipe,PaginationComponent],
  templateUrl: './product-cart-list.component.html',
  styleUrl: './product-cart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartListComponent implements OnInit {
  @Input() filterByCategoryId: number | null = null;
  @Output() viewProduct = new EventEmitter<ProductListItem>();

  productList!: PaginatedList<ProductListItem>;
  readonly pageSize: number = 12;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(page: number = 1) {
    this.productsService
      .getList(page, this.pageSize)
      .pipe(take(1))
      .subscribe((productList) => {
        this.productList = productList;
        this.change.markForCheck();
      });
  }

  onPageChange(newPage: number) {
    this.getProductList(newPage);
  }

  onViewProduct(product: ProductListItem) {
    this.viewProduct.emit(product);
  }

}
