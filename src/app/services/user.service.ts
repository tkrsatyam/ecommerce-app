import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result)
        if (result) {
          this.isUserLoggedIn.next(true)
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
      })
  }

  reloadUser() {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
        this.isUserLoggedIn.next(true)
        this.router.navigate(['/'])
      }
    }
  
    userLogin(data: login) {
      this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false)
          this.isUserLoggedIn.next(true)
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        } else {
          console.warn("login failed")
          this.isLoginError.emit(true)
        }
      })
    }
}
