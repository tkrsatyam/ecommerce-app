import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  showSignUp = false
  authError: String = '';
  constructor(private seller: SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: NgForm): void {
    console.warn(data.value)
    this.seller.userSignUp(data.value)
  }

  login(data: NgForm): void {
    this.seller.userLogin(data.value)
    this.seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = 'Email or password is not correct. Please try again.'
      }
    })
  }

  openLogin() {
    this.showSignUp = false
  }

  openSignUp() {
    this.showSignUp = true
  }
}
