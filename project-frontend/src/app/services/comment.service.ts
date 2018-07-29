import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Komentar } from '../Komentar';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  KomentarUrl: string = 'http://localhost:3000/comments';

  addNewComment(newKomentar: Komentar): Observable<Komentar> {
    return this.http.post<Komentar>(this.KomentarUrl, newKomentar);
  }

  getCommentbyID(id:string): Observable<Komentar[]> {
    return this.http.get<Komentar[]>(this.KomentarUrl + `/${id}`);
  }

  getComment(): Observable<Komentar[]> {
    return this.http.get<Komentar[]>(this.KomentarUrl );
  }
  

  }
