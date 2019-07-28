import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private auth: AuthService;
    private router: Router;
    private loginService: LoginService;

    public username: string = "";
    public password: string = "";
    public usernameError: string = "";
    public passwordError: string = "";
    public errorMessage : string = "";

    constructor(auth: AuthService, router: Router, loginService : LoginService) {
        this.auth = auth;
        this.router = router;
        this.loginService = loginService;
    }

    ngOnInit() {
    }

    public clearErrorAlert() {
        this.errorMessage ="";
    }

    public signInClicked() {
        let missingFieldsErrors: boolean = false;
        this.usernameError = "";
        this.passwordError = "";

        if (this.username == "") {
            this.usernameError = "Username cannot be empty";
            missingFieldsErrors = true;
        }
        if (this.password == "") {
            this.passwordError = "Password cannot be empty;"
            missingFieldsErrors = true;
        }

        if (!missingFieldsErrors){
            this.loginService.login(this.username, this.password).subscribe(
                data => {
                    debugger;
                    this.auth.setAuthKey(data.token);
                    this.router.navigate(['home']);
                },
                error => {
                    this.errorMessage = error;
                });
        }
    }
}
