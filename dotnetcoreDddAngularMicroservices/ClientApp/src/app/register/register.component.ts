import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    private registerService: RegisterService;
    private auth: AuthService;
    private router: Router;

    public username: string="";
    public password: string="";
    public password2: string="";

    public usernameError: string="";
    public passwordError:string=""
    public password2Error: string="";
    public errorMessage: string ="";


    constructor(registerService : RegisterService, auth : AuthService, router : Router) {
        this.registerService = registerService;
        this.auth = auth;
        this.router = router;
    }

    ngOnInit() {
    }

    public clearErrorAlert() {
        this.errorMessage ="";
    }
    public signUpClicked() {
        let wrongFieldsError: boolean = false;

        this.usernameError = "";
        if (this.username == "") {
            this.usernameError = "Username cannot be empty";
            wrongFieldsError = true;
        }

        this.passwordError = "";
        if (this.password == "") {
            this.passwordError = "Password cannot be empty";
            wrongFieldsError = true;
        }

        this.password2Error = "";
        if (this.password2 == "") {
            this.password2Error = "Repeat Password cannot be empty";
            wrongFieldsError = true;
        } else if (this.password2 != this.password) {
            this.password2Error = "Repeat Password and Password must be the same";
            wrongFieldsError = true;
        }

        if (!wrongFieldsError) {
            this.registerService.register(this.username, this.password).subscribe(
                () => {
                    debugger;
                    this.auth.login(this.username, this.password).subscribe(
                        response => {
                            this.auth.setAuthKey(response.token);
                            this.router.navigate(['home']);
                        },
                        error => {
                            debugger;
                            this.errorMessage = error;
                        }
                    );
                },
                error => {
                    debugger;
                    this.errorMessage = error;
                }
            );
        }

    }

}
