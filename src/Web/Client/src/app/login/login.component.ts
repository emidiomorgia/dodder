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
    public username: string;
    public password: string;

    constructor(loginService: LoginService, router: Router) {
        this.loginService = loginService;
        this.router = router;
    }

    public hasErrors(): boolean {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }

    public loginClicked() {
        let errors = "";
        if (this.username == "" || this.username == null) {
            errors += "-Username cannot be empty";
        }
        if (this.password == "" || this.password == null) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password cannot be empty";
        }
        if (errors == "") {
            this.loginService.login(this.username, this.password).subscribe(
                data => {
                    this.router.navigate(['home']);
                },
                error => {
                    this.errorMessage = error;
                });
        } else {
            this.errorMessage = "In order to continue please correct the following errors:" + "<br/>" + errors;
        }
    }

    ngOnInit() {
    }

}
