import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    // poziv servisa
    this.auth.login(this.user);
  }

}
