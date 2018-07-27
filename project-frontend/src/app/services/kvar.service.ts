import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Kvar } from '../Kvar';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class KvarService {

 constructor (private http: HttpClient) {}

 kvarUrl : string ='http://localhost:3000/tickets';


getKvar():Observable<Kvar[]>{
  return this.http.get<Kvar[]>(this.kvarUrl);
}

insertKvar(newKvar:Kvar):Observable<Kvar>{
  return this.http.post<Kvar>(this.kvarUrl, newKvar);
}

deleteKvar(_id:string):Observable<Object>{
  return this.http.delete<Object>(this.kvarUrl + `/${_id}`);
}

updateKvar(currKvar:Kvar):Observable<Object>{
  return this.http.put<Object>(this.kvarUrl + `/${currKvar._id}`,currKvar);
}

getKvarByReq(my:User):Observable<Kvar[]>{
  return this.http.get<Kvar[]>(this.kvarUrl + `/${my.name}`); 
}

}
