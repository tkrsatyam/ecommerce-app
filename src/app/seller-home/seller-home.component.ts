import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  productMessage: undefined | string;
  deleteIcon = faTrash;
  editIcon = faEdit;
  constructor(private readonly product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  delete(product: product) {
    const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
  
    if (confirmed) {
      this.product.deleteProduct(product.id).subscribe((result) => {
        if (result) {
          this.productMessage = `The product "${product.name}" has been deleted`;
          this.list();
        }
      });
  
      setTimeout(() => {
        this.productMessage = undefined;
      }, 5000);
    }
  }
  

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    })
  }

}
