import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowTicketsComponent } from './show-tickets/show-tickets.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InsertTicketComponent } from './insert-ticket/insert-ticket.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FileSelectDirective } from "ng2-file-upload";
import { ChartsModule } from 'ng2-charts';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { KvarComponent } from './kvar/kvar.component';
import { DepesaComponent } from './depesa/depesa.component';

import { CustomMaterialModule } from "./app-routing/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatPaginatorModule } from '@angular/material';

import { ExcelService } from './services/excell.service';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    ShowTicketsComponent,
    InsertTicketComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FileSelectDirective,
    MyTicketsComponent,
    KvarComponent,
    DepesaComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaWMhibq11Fby5ZCxs85evRAds2n36ZBM'
    })
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
