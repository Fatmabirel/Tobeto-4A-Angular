import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicLayoutComponent } from "../../shared/components/basic-layout/basic-layout.component";
import { CategoryListGroupComponent } from '../../features/categories/components/category-list-group/category-list-group.component';
import { ProductCartListComponent } from '../../features/products/product-cart-list/product-cart-list.component';

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
        ProductCartListComponent
    ]
})
export class HomePageComponent { }
