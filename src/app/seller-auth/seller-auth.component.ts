import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router:Router) {}

  signUp(data: NgForm): void {
    console.warn(data.value)
    this.seller.userSignUp(data.value).subscribe((result) => {
      if(result) {
        this.router.navigate(['seller-home'])
      }
    })
  }
}
