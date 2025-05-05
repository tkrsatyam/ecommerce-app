import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQty: number = 1;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        this.productData = data;
      })
    }
  }

  handleQty(val: string) {
    if (this.productQty < 20 && val === 'add') {
      this.productQty += 1;
    } else if (this.productQty > 1 && val === 'subtract') {
      this.productQty -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.cartQty = this.productQty;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
      }
    }
  }
}
