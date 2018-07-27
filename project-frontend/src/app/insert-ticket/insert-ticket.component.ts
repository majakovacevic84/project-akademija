import { Component, OnInit } from '@angular/core';
import { TicketService } from './../services/ticket.service';
import { Ticket } from '../Ticket';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.css']
})

export class InsertTicketComponent implements OnInit {

  uploader : FileUploader = new FileUploader({ url: 'http://localhost:3000/upload', itemAlias: 'doc' });
  title = '';
  body = '';
  documentPath = '';
  akcija ='Tiket';
  selectedTicket: Ticket = null;

  constructor(private ticketService : TicketService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.success){
        this.insertTicket(response.filename);
      }
    } 
  }

   insertTicket(documentPath:string):void {

    let newTicket : Ticket = new Ticket(undefined, this.title, this.body,documentPath,this.akcija);
    this.ticketService.insertTicket(newTicket)
      .subscribe(result => {
        if (result && result._id){
          alert('Tiket je isnertovan!');
          this.resetFields();  
        }
        else{
          alert('Greska prilikom unosa!');
        }
        
      })
  }

  insertTicket2():void {

    let newTicket : Ticket = new Ticket(undefined, this.title, this.body,undefined,this.akcija);
    this.ticketService.insertTicket(newTicket)
      .subscribe(result => {
        if (result.title && result.body && result._id){
          alert('Tiket je isnertovan!');
          this.resetFields();  
        }
        else{
          alert('Greska prilikom unosa!');
        }
        
      })
  }

  resetFields():void{
    this.title = '';
    this.body = '';
  }

}
