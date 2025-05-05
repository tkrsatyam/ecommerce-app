import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = ''
  userName: string = ''
  cartItems = 0;

  constructor(private readonly route: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined' && localStorage.getItem('seller') && event.url.includes('seller')) {
          const seller = localStorage.getItem('seller');
          const sellerData = seller && JSON.parse(seller);
          this.sellerName = sellerData[0].name;
          this.menuType = 'seller';
        } else if (typeof window !== 'undefined' && localStorage.getItem('user')) {
          const user = localStorage.getItem('user');
          const userData = user && JSON.parse(user);
          this.userName = userData[0].name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });

    this.updateCartItemsFromLocalStorage();

    this.productService.cartDataEvent.subscribe((items) => {
      this.cartItems = items.reduce((total, item) => total + (item.cartQty ?? 0), 0);
    });
  }

  private updateCartItemsFromLocalStorage(): void {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      this.cartItems = parsedData.reduce((total: number, item: any) => total + (item.cartQty ?? 0), 0);
    }
  }


  logoutSeller() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.menuType = 'default'
  }
}
