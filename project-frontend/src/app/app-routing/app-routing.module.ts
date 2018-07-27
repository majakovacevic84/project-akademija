import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  Routes,  Router} from '@angular/router';
import { ShowTicketsComponent } from '../show-tickets/show-tickets.component';
import { InsertTicketComponent } from '../insert-ticket/insert-ticket.component';
import { RegisterComponent } from './../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { MyTicketsComponent } from '../my-tickets/my-tickets.component';
import { KvarComponent } from '../kvar/kvar.component';
import { DepesaComponent } from '../depesa/depesa.component';

const routes : Routes= [
  {path : 'dashboard', component : ShowTicketsComponent},
  {path : 'insertTicket', component : InsertTicketComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'myTicket', component: MyTicketsComponent },
  { path: 'insertKvar', component: KvarComponent},
  { path: 'insertdepesa', component: DepesaComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
