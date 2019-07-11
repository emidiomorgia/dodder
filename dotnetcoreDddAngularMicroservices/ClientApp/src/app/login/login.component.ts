import { Component, OnInit } from '@angular/core';
import { AuthService } from '../infrastructure/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private auth: AuthService;

  public username: string="";
  public password: string="";
  public usernameError: string="";
  public passwordError: string="";

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
  }

  public signInClicked() {
    var missingFieldsErrors: boolean = false;
    if (this.username == "") {
      this.usernameError = "Username cannot be empty";
      missingFieldsErrors = true;
    }
    if (this.password == "") {
      this.passwordError = "Password cannot be empty;"
      missingFieldsErrors = true;
    }
    if (!missingFieldsErrors) {

    }
  }

}
