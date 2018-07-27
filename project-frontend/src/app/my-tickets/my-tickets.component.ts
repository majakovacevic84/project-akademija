import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../User';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../Ticket';
import { TicketService } from '../services/ticket.service';
import { AuthenticationService } from '../services/authentication.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../services/excell.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})

export class MyTicketsComponent implements OnInit {

  myTickets : Ticket[];
  mySelectedTicket: Ticket = null;
  myUsers : User[];
  mySelectedUser: User = null;

  excellTiket: Ticket[];

  constructor(private userService : UserService, private ticketService: TicketService, 
  private authService: AuthenticationService,private excelService: ExcelService ) 
  { 
    this.excelService = excelService;
    //this.excellTiket = ELEMENT_DATA;
  }

  ngOnInit() {
      
        /************** popunjavanja podataka za Data Tabelu *****************/
        let user=this.authService.getUserDetails();
        this.ticketService.getTicketByReq(user)
                          .subscribe( data => { this.dataSource.data = data});


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        /************** popunjavanja podataka za Excell *****************/
         this.ticketService.getTicketByReq(user)
                          .subscribe( data => {this.excellTiket  = data});


        /************** popunjavanja podataka listu usera  *****************/
        this.getUsers();
  }



  /************** export u execell *****************/
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.excellTiket, 'myUsers');
  }

displayedColumns: string[] = ['akcija', 'title', 'status', 'dodijeljen', 'datum'];
//dataSource = new MatTableDataSource();
dataSource= new MatTableDataSource<Ticket>();

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

/************** applyFilter Fja za Data Tabelu *****************/
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
}


myselectTicket(ticket:Ticket){
  this.mySelectedTicket = ticket;
}


myrowClicked(row: any): void {
  //console.log(row);
  this.mySelectedTicket = row;
}

mycloseTicket(){
  this.mySelectedTicket = null;
}


/******************* user data ******************/

getUsers() {
  this.userService.getUsers()
  .subscribe(data => {
   this.myUsers=data;
  } )  
}

selectUser(user:User){
  this.mySelectedUser = user;
}

/************** TIKET ***************/

updateTicket(){
  if(confirm('Da li ste sigurni da zelite da sacuvate izmjene?')){
   if( this.mySelectedTicket.status=='Novi') { this.mySelectedTicket.status='Dodijeljen'}
   this.ticketService.updateTicket(this.mySelectedTicket)
   .subscribe(
     result => {
     alert('Tiket je sacuvan!');
     location.reload();
   })
 }
}


insertCommentTicket(){
  if(confirm('Da li ste sigurni da zelite da sacuvate izmjene?')){
    if( this.mySelectedTicket.status=='Novi') { this.mySelectedTicket.status='Dodijeljen'}
    this.ticketService.insertCommentTicket(this.mySelectedTicket)
    .subscribe(
      result => {
      alert('Tiket je sacuvan!');
      location.reload();
    })
  }
}


}
