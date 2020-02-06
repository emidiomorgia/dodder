import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LoginRequestDTO } from './login-request-dto';

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

    private _loading: boolean;
    public get loading(): boolean { return this._loading; }
    public set loading(v: boolean) { this._loading = v }

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
        this.errorMessage = "In order to continue please correct the following errors:" + "<br/>" + errors;

        if (errors == "") {
            this.errorMessage = "";
            this.loading = true;
            this.loginService.login(new LoginRequestDTO(this.username, this.password)).subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(['home']);
                },
                error => {
                    this.loading = false;
                    this.errorMessage = error;
                });
        }
    }



    ngOnInit() {
    }

}
