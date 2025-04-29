import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { CommonModule } from '@angular/common';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  showSignUp = false
  authError: string = '';
  showPassword: boolean = false;
  showLoginPassword: boolean = false;
  eye = faEye;
  eyeSlash = faEyeSlash;

  constructor(private readonly seller: SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: NgForm): void {
    this.seller.sellerSignUp(data.value)
  }

  login(data: NgForm): void {
    this.seller.sellerLogin(data.value)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
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
