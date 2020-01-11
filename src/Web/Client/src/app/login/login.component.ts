import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginService: LoginService;
  private router: Router;

  public errorMessage: string;
  public username : string;
  public password: string;

  constructor(loginService : LoginService, router : Router) {
    this.loginService = loginService;
    this.router=router;
  }

  public loginClicked() {
    debugger;
    this.loginService.login(this.username, this.password).subscribe(
      data => {
debugger;
          this.router.navigate(['home']);
      },
      error => {
        debugger;
          this.errorMessage = error;
    });
  }

  ngOnInit() {
  }

}
