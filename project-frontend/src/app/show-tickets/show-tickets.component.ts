import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../Ticket';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { User } from '../User';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { KvarService } from '../services/kvar.service';
import { DepeseService } from '../services/depese.service';
import { Kvar } from '../Kvar';
import { Depesa } from '../Depesa';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Chart } from '../Chart';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.css']
})

export class ShowTicketsComponent implements OnInit {

  tickets: Ticket[];
  users: User[];
  selectedTicket: Ticket = null;
  selectedUser: User = null;

  // Pie

  pieCharthelp: any[];
  pieCharthelp2: any[];

  pieChartLabels = ['', '', ''];
  pieChartData = [1, 1, 1];

  pieChartLabels2 = ['', '', ''];
  pieChartData2 = [1, 1, 1];

  pieChartType: string = 'pie';
  isDataAvailable: boolean = false;
  isDataAvailable2: boolean = false;


  docUrl: string = 'http://localhost:3000/uploads/';//ovo je potrebno zbog ts je se poziva na ovaj URL


  constructor(private ticketService: TicketService, private userService: UserService,
    private kvarService: KvarService, private depesaService: DepeseService, private toastr: ToastrService) {
  }

  ngOnInit() {


    this.getTickets();
    this.getUsers();
    //this.getPieTicket();

    this.ticketService.getTickets()
      .subscribe(data => { this.dataSource.data = data });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log(this.pieChartData2);

    /****     getPieTickets  *******/
    this.ticketService.getPieTickets()
      .subscribe(data => {
        this.pieCharthelp = data;

        for (let i = 0; i < this.pieCharthelp.length; i++) {
          this.pieChartData2[i] = this.pieCharthelp[i].count;
          this.pieChartLabels2[i] = this.pieCharthelp[i]._id;
        }
        //console.log(this.pieChartLabels2);
        this.isDataAvailable2 = true;
      });

    /****    getPStatusieTickets  *******/

    this.ticketService.getPieStatusTickets()
      .subscribe(data => {
        this.pieCharthelp2 = data;

        for (let i = 0; i < this.pieCharthelp2.length; i++) {
          this.pieChartData[i] = this.pieCharthelp2[i].count;
          this.pieChartLabels[i] = this.pieCharthelp2[i]._id;
        }
        this.isDataAvailable = true;
      });



  }

  /************** Toastr  *****************/
  showSuccess() {
    this.toastr.success('Uspješan unos izmjena!', 'Uspješno!');
  };

  showSuccessDelete() {
    this.toastr.success('Uspješno ste izbrisali akciju!', 'Uspješno!');
  };

  showError() {
    this.toastr.error('Greška prilikom unosa!', 'Greška!');
  }

  showWarning() {
    this.toastr.warning('Izmijenili ste akcije', 'Upozorenje!');
  }

  /************************** DATA TABLE *******************/
  displayedColumns: string[] = ['akcija', 'title', 'status', 'dodijeljen', 'datum'];
  //dataSource = new MatTableDataSource();
  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  /******************* tickets ******************/

  getTickets() {
    this.ticketService.getTickets()
      .subscribe(data => {
        this.tickets = data;
        //console.log(this.tickets);
      })
  }

  deleteTicket() {

    this.ticketService.deleteTicket(this.selectedTicket._id)
      .subscribe(result => {
        this.showSuccessDelete();
        location.reload();
      })


  }

  updateTicket() {

    if (this.selectedTicket.status == 'Novi') { this.selectedTicket.status = 'Dodijeljen' }
    this.ticketService.updateTicket(this.selectedTicket)
      .subscribe(
        result => {
          this.showSuccess();
          location.reload();
        })

  }

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  closeNote() {
    this.selectedTicket = null;
  }

  rowClicked(row: any): void {
    console.log(row);
    this.selectedTicket = row;
  }


  /******************* user ******************/

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      })
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }


  /******************* CHARTS ******************/


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}

