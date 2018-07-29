import { Injectable } from '@angular/core';
import { Ticket } from './../Ticket';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Chart } from '../Chart';
import { User } from '../User';
import { Komentar } from '../Komentar';


@Injectable({
  providedIn: 'root'
})

export class TicketService {

  ticketUrl: string = 'http://localhost:3000/tickets';
  ticketPieUrl: string = 'http://localhost:3000/tickets/status';
  ticketPieStatusUrl: string = 'http://localhost:3000/tickets/akcije';
  ticketUrlMoji: string = 'http://localhost:3000/tickets/moji';
  ticketUrlMe: string = 'http://localhost:3000/tickets/me';
  ticketUrlComment: string = 'http://localhost:3000/tickets/komentar';


  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    let token = window.localStorage.getItem('notes-token');
    return this.http.get<Ticket[]>(this.ticketUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

  }

  insertTicket(newTicket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketUrl, newTicket);
  }

  deleteTicket(_id: string): Observable<Object> {
    return this.http.delete<Object>(this.ticketUrl + `/${_id}`);
  }

  updateTicket(currTicket: Ticket): Observable<Object> {
    return this.http.put<Object>(this.ticketUrl + `/${currTicket._id}`, currTicket);
  }

  getPieTickets(): Observable<Chart[]> {
    return this.http.get<Chart[]>(this.ticketPieUrl);
  }

  getPieStatusTickets(): Observable<Chart[]> {
    return this.http.get<Chart[]>(this.ticketPieStatusUrl);
  }

  insertCommentTicket(mycurrTicket: Ticket): Observable<Object> {
    return this.http.put<Object>(this.ticketUrlMoji + `/${mycurrTicket._id}`, mycurrTicket);
  }


  getTicketByReq(my: User): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketUrlMe + `/${my.name}`);
  }

  getTicketById(mycurrTicket: Ticket): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketUrl + `/${mycurrTicket._id}`);
  }

  
  getAllComments(mycurrTicket: Ticket):Observable<Komentar[]> {
    return this.http.get<Komentar[]>(this.ticketUrlComment + `/${mycurrTicket._id}`);
  }
    
    
}
