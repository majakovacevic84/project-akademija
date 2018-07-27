import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 user : User = new User();

  constructor(private auth : AuthenticationService) { }

  ngOnInit() {
  }

  register(){
    this.auth.register(this.user);
  }

}
