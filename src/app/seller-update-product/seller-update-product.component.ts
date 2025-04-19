import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule, RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private readonly route: ActivatedRoute, private readonly product: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    if (productId) {
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data
      });
    } else {
      console.error('Product ID not found in route');
    }
  }

  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = `The product ${result.name} has been updated successfully.`
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
      this.product.redirectToList();
    }, 4000);
    console.log(data)
  }
}
