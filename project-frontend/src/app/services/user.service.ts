import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = 'http://localhost:3000/user';
  apiUrl: string = 'http://localhost:3000';
  

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }


  getUserByID(_id: string): Observable<User> {
    return this.http.get<User>(this.userUrl + `/${_id}`);
  }

  updateUser(currUser: User): Observable<Object> {
    return this.http.put<Object>(this.userUrl + `/${currUser._id}`, currUser);
  }

/*
  updateUserPass(currUser: User): Observable<Object> {
    return this.http.put<Object>(this.apiUrl + '/user/updatepass', currUser);
  }
  */
  
 }
