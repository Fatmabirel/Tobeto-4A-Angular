import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basic-examples',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './basic-examples.component.html',
  styleUrl: './basic-examples.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicExamplesComponent {
  title: string = 'Northwind market';

  cartCount: number = 0; //sepetteki ürün sayısını tutar

  products: {name:string; price: number; discontinued: boolean} [] = [
    {
      name: "Çay",
      price: 100,
      discontinued: false
    },
    {
      name: "Kahve",
      price: 80,
      discontinued: false
    },
    {
      name: "Limonata",
      price: 54,
      discontinued: true
    },
    {
      name: "Maden suyu",
      price: 15,
      discontinued: false
    },
    {
      name: "Kola",
      price: 60,
      discontinued: true
    }
  ]

  onAddProductToCart(): void {
    this.cartCount ++;
    console.log("Ürün sepete eklendi");
  }
 }
