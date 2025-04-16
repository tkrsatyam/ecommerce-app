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

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('seller') && event.url.includes('seller')) {
          let seller = localStorage.getItem('seller');
          let sellerData =seller && JSON.parse(seller);
          this.sellerName = sellerData[0].name;
          this.menuType = 'seller'
        } else {
          this.menuType = 'default'
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
}
