import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl : string = 'http://localhost:3000';

  constructor(private http : HttpClient,
    private router : Router) { }

register(user:User){
this.http.post<AuthenticationResponse>(this.apiUrl + '/user/register', user)
.subscribe(result => {
if(result.success){
window.localStorage.setItem('app-token', result.token);
this.router.navigateByUrl('/');
}
else { alert('Nije prosla uspjesno registracija!')}

});
}

 getUserDetails():User{
  let token = window.localStorage.getItem('app-token');
  if (!token){
    return null;
  }

  let userDetails = token.split('.')[1];
  userDetails = window.atob(userDetails);
  return JSON.parse(userDetails);
}

isLoggedIn():boolean{
  let user = this.getUserDetails();
  if (!user){
    return false;
  }

  return (user.expiry > (Date.now() / 1000));
}
/*
isRegister():boolean{
  let user = this.getUserDetails();
  if (!user){
    console.log('Vec postoji takav user!')
    return false;
  }

  return (user.expiry > (Date.now() / 1000));
}
*/

isAdmin():boolean{
  let user = this.getUserDetails();
  if (!user){
    return false;
  }

  return ((user.expiry > (Date.now() / 1000)) && user.userRole=='1');
}

logout(){
  window.localStorage.removeItem('app-token');
  this.router.navigateByUrl('/');
}

login(user:User){
  this.http.post<AuthenticationResponse>(this.apiUrl + '/user/login', user)
    .subscribe(result => {
      if(result.success){
        window.localStorage.setItem('app-token', result.token);
        this.router.navigateByUrl('/');
      }
    });
}
}

class AuthenticationResponse {
success : boolean;
token : string;
}
