import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

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

  constructor(private readonly route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined' && localStorage.getItem('seller') && event.url.includes('seller')) {
          let seller = localStorage.getItem('seller');
          let sellerData = seller && JSON.parse(seller);
          this.sellerName = sellerData[0].name;
          this.menuType = 'seller'
        } else if (typeof window !== 'undefined' && localStorage.getItem('user')) {
          let user = localStorage.getItem('user');
          let userData = user && JSON.parse(user);
          this.userName = userData[0].name;
          this.menuType = 'user'
        } else {
          this.menuType = 'default'
        }
      }
    })
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
