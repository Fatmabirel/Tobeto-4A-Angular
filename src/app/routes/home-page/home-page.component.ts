import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { CategoryListGroupComponent } from '../../features/categories/components/category-list-group/category-list-group.component';
import { ProductCartListComponent } from '../../features/products/product-cart-list/product-cart-list.component';
import { ProductListItem } from '../../features/products/models/product-list-item';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    BasicLayoutComponent,
    CategoryListGroupComponent,
    ProductCartListComponent,
  
  ],
})
export class HomePageComponent {
  selectedCategoryId: number | null = null;

  onChangeCategorySelect(event: number | null) {
    this.selectedCategoryId = event;
    this.router.navigate([], {
      queryParams: { categoryId: this.selectedCategoryId },
      relativeTo: this.route,
    });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProductFiltersFromRoute();
  }

  getProductFiltersFromRoute() {
    this.route.queryParams
      .subscribe((queryParams) => {
        const categoryId = queryParams['categoryId'];
        if (categoryId) this.selectedCategoryId = Number(categoryId);
      })
      .unsubscribe();
  }

  onViewProduct(product: ProductListItem) {
    this.router.navigate(['products', 'detail', product.id]); // localhost:4200/products/detail/1
  }
}
