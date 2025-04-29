import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showSignUp = false
  authError: string = '';
  constructor(private readonly user: UserService) { }

  ngOnInit(): void {
    this.user.reloadUser()
  }

  signUp(data: signUp): void {
    this.user.userSignUp(data)
  }

  login(data: login): void {
    this.user.userLogin(data)
    this.user.isLoginError.subscribe((isError) => {
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
