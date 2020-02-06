import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LoginRequest } from './login-request';
import { inherits } from 'util';
import { ComponentBaseComponent } from '../shared/component-base/component-base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentBaseComponent implements OnInit {
    private loginService: LoginService;
    private router: Router;

    public username: string;
    public password: string;

    constructor(loginService: LoginService, router: Router) {
        super();
        this.loginService = loginService;
        this.router = router;
    }

    public loginClicked() {
        this.errorMessage = "";
        this.loading = true;

        this.loginService.login(this.username, this.password).subscribe(
            data => {
                this.loading = false;
                this.router.navigate(['home']);
            },
            error => {
                this.loading = false;
                this.errorMessage = "In order to continue please correct the following errors:" + "<br/>" + error;

            });
    }

    public registerClicked() {
        this.router.navigate(['register']);
    }


    ngOnInit() {
    }

}
