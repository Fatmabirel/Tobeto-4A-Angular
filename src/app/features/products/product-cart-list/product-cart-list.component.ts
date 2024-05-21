import { CommonModule } from '@angular/common';
import { ProductListItem } from '../models/product-list-item';
import { CardComponent } from '../../../shared/components/card/card.component';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-cart-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './product-cart-list.component.html',
  styleUrl: './product-cart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartListComponent implements OnInit {
  @Input() filterByCategoryId: number | null = null;
  @Output() viewProduct = new EventEmitter<ProductListItem>();

  productList!: ProductListItem[];


  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    const request = this.productsService.getList().subscribe((productList) => {
      this.productList = productList;
      request.unsubscribe();
    });
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
