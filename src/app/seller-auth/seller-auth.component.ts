import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService) {}

  ngOnInit(): void {
      this.seller.reloadSeller()
  }

  signUp(data: NgForm): void {
    console.warn(data.value)
    this.seller.userSignUp(data.value)
  }
}
