import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProduct: undefined | product[];
  productList: undefined | product[];
  constructor(private product: ProductService) { }

  ngOnInit(): void {
      this.product.showPopularProducts().subscribe((data) => {
        this.popularProduct = data;
      })

      this.product.productList().subscribe((data) => {
        this.productList = data;
      })
  }
}
