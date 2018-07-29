import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private router: Router,  private toastr: ToastrService) { }

  register(user: User) {
    this.http.post<AuthenticationResponse>(this.apiUrl + '/user/register', user)
      .subscribe(result => {
        if (result.success) {
          window.localStorage.setItem('app-token', result.token);
          this.showSuccess();
          this.router.navigateByUrl('/');
        }
        else { this.showError(); }

      });
  }

  getUserDetails(): User {
    let token = window.localStorage.getItem('app-token');
    if (!token) {
      return null;
    }
    let userDetails = token.split('.')[1];
    userDetails = window.atob(userDetails);
    return JSON.parse(userDetails);
  }

  isLoggedIn(): boolean {
    let user = this.getUserDetails();
    if (!user) {
      return false;
    }

    return (user.expiry > (Date.now() / 1000));
  }

  isAdmin(): boolean {
    let user = this.getUserDetails();
    if (!user) {
      return false;
    }

    return ((user.expiry > (Date.now() / 1000)) && user.userRole == '1');
  }

  logout() {
    window.localStorage.removeItem('app-token');
    this.router.navigateByUrl('/');
  }

  login(user: User) {
    this.http.post<AuthenticationResponse>(this.apiUrl + '/user/login', user)
      .subscribe(result => {
        if (result.success) {
          window.localStorage.setItem('app-token', result.token);
          this.router.navigateByUrl('/');
          this.showSuccessLogin();
        }
        else {
          this.showErrorLogin();
        }
      });
  }

/*
  updateUserPass(currUser: User) {
    return this.http.put<AuthenticationResponse>(this.apiUrl +  '/user/updatepass', currUser)
    .subscribe(result => {
      if (result.success) {
        window.localStorage.setItem('app-token', result.token);
        this.router.navigateByUrl('/');
        this.showSuccessLogin();
      }
      else {
        this.showErrorLogin();
      }
    });
   
  }

*/

  /************** Toastr  *****************/
  showSuccess() {
    this.toastr.success('Uspješno ste registrovani!', 'Uspješno!');
  };
  showSuccessLogin() {
    this.toastr.success('Uspješno ste logovani!', 'Uspješno!');
  };

  showError() {
    this.toastr.error('Greška prilikom registracije!', 'Greška!');
  }

  showErrorLogin() {
    this.toastr.error('Greška prilikom logovanja!', 'Greška!');
  }

}

class AuthenticationResponse {
  success: boolean;
  token: string;
}
