import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

export const productsRoutes: Routes = [
  {
    path: 'products/detail/:productId',
    component: ProductDetailPageComponent,
  },
];