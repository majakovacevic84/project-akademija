import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Depesa } from '../Depesa';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class DepeseService {

 constructor (private http: HttpClient) {}

 DepesaUrl : string ='http://localhost:3000/tickets';


getDepesa():Observable<Depesa[]>{
  return this.http.get<Depesa[]>(this.DepesaUrl);
}

insertDepesa(newDepesa:Depesa):Observable<Depesa>{
  return this.http.post<Depesa>(this.DepesaUrl, newDepesa);
}

deleteDepesa(_id:string):Observable<Object>{
  return this.http.delete<Object>(this.DepesaUrl + `/${_id}`);
}

updateDepesa(currDepesa:Depesa):Observable<Object>{
  return this.http.put<Object>(this.DepesaUrl + `/${currDepesa._id}`,currDepesa);
}


getDepesaByReq(my:User):Observable<Depesa[]>{
  return this.http.get<Depesa[]>(this.DepesaUrl + `/${my.name}`); 
}


}
