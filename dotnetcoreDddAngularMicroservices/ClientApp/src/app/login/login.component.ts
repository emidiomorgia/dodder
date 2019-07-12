import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private auth: AuthService;
    private router: Router;

    public username: string = "";
    public password: string = "";
    public usernameError: string = "";
    public passwordError: string = "";
    

    constructor(auth: AuthService, router: Router) {
        this.auth = auth;
        this.router = router;
    }

    ngOnInit() {
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
        if (!missingFieldsErrors) {
            this.auth.login(this.username, this.password);
            this.router.navigate(['home']);
        }
    }

}
