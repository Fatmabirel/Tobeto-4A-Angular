import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { CategoryListGroupComponent } from '../../features/categories/components/category-list-group/category-list-group.component';
import { ProductCartListComponent } from '../../features/products/components/product-cart-list/product-cart-list.component';
import { ProductListItem } from '../../features/products/models/product-list-item';
import { SharedModule } from '../../shared/shared.module';
import { IfNotDirective } from '../../features/products/directives/if-not.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    SharedModule,
    CategoryListGroupComponent,
    ProductCartListComponent,
    IfNotDirective,
  
  ],
})
export class HomePageComponent {
  selectedCategoryId: number | null = null;
  oldUser: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private change:ChangeDetectorRef) {}

  onChangeCategorySelect(event: number | null) {
    this.selectedCategoryId = event;
    this.router.navigate([], {
      queryParams: { categoryId: this.selectedCategoryId },
      relativeTo: this.route,
    });
  }


  ngOnInit(): void {
    this.getProductFiltersFromRoute();
    this.detectOldUser();
  }

  detectOldUser() {
    const isOldUser = Boolean(localStorage.getItem('isOldUser'));
    if (!isOldUser) {
      localStorage.setItem('isOldUser', 'true');
      return;
    }
    setTimeout(() => {
      this.oldUser = isOldUser;
      this.change.markForCheck();
    }, 5000);
  }
  getProductFiltersFromRoute() {
    this.route.queryParams.subscribe((queryParams) => {
      const categoryId = queryParams['categoryId'];
      if (categoryId) this.selectedCategoryId = Number(categoryId);
      else this.selectedCategoryId = null;
      this.change.markForCheck();
    });
  }

  onViewProduct(product: ProductListItem) {
    this.router.navigate(['products', 'detail', product.id]); // localhost:4200/products/detail/1
  }
}
