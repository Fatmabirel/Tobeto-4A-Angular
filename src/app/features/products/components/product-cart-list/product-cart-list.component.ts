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

  productList!: ProductListItem[];
  page: number = 1;
  readonly pageSize: number = 12;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productsService
      .getList(this.page, this.pageSize)
      .pipe(take(1))
      .subscribe((productList) => {
        this.productList = productList;
        this.change.markForCheck();
      });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getProductList();
  }

  onViewProduct(product: ProductListItem) {
    this.viewProduct.emit(product);
  }

  get filteredProductList(): ProductListItem[] {
    let filteredProductList = this.productList;

    if (this.filterByCategoryId) {
      filteredProductList = this.productList.filter(
        (product) => product.categoryId === this.filterByCategoryId
      );
    }

    return filteredProductList;
  }
}
