import { CommonModule, DOCUMENT } from '@angular/common';
import { ProductListItem } from '../../models/product-list-item';
import { CardComponent } from '../../../../shared/components/card/card.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
export class ProductCartListComponent implements OnInit,OnChanges,OnDestroy  {
  @Input() filterByCategoryId: number | null = null;
  @Output() viewProduct = new EventEmitter<ProductListItem>();

  productList!: PaginatedList<ProductListItem>;
  readonly pageSize: number = 12;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.document.addEventListener('scroll', () => this.onScroll());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['filterByCategoryId'] &&
      changes['filterByCategoryId'].currentValue !==
        changes['filterByCategoryId'].previousValue
    )
      this.getProductList();
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('scroll', () => {});
  }
  getProductList(page: number = 1) {
    this.productsService
      .getList(page, this.pageSize, {
        categoryId: this.filterByCategoryId || undefined,
      })
      .pipe(take(1))
      .subscribe((productList) => {
        if (!this.productList) this.productList = productList;
        else {
          this.productList!.items.push(...productList.items);
          this.productList!.pageIndex = productList.pageIndex;
          this.productList!.totalItems = productList.totalItems;
        }
        this.change.markForCheck();
      });
  }

  onPageChange(newPage: number) {
    this.getProductList(newPage);
  }

  onViewProduct(product: ProductListItem) {
    this.viewProduct.emit(product);
  }
  private onScroll() {
    if (
      this.productList &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.productList.pageIndex * this.pageSize < this.productList.totalItems
    )
      this.getProductList(this.productList.pageIndex + 1);
  }

}
