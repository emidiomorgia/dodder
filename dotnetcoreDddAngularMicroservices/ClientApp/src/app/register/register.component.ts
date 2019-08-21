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
        let isValid: boolean = this.validateFields();

        if (isValid) {
            this.registerAndLogin();
        }

    }

    private validateFields() {
        let isValid: boolean=true;

        this.usernameError = "";
        if (this.username == "") {
            this.usernameError = "Username cannot be empty";
            isValid = false;
        }
        this.passwordError = "";
        if (this.password == "") {
            this.passwordError = "Password cannot be empty";
            isValid = false;
        }
        this.password2Error = "";
        if (this.password2 == "") {
            this.password2Error = "Repeat Password cannot be empty";
            isValid = false;
        }
        else if (this.password2 != this.password) {
            this.password2Error = "Repeat Password and Password must be the same";
            isValid = false;
        }

        return isValid;
    }

    private registerAndLogin() {
        this.registerService.register(this.username, this.password).subscribe(() => {
            this.doLogin();
        }, error => {
            this.errorMessage = error;
        });
    }

    private doLogin() {
        this.auth.login(this.username, this.password).subscribe(response => {
            //this.auth.setAuthKey(response.token);
            this.router.navigate(['home']);
        }, error => {
            this.errorMessage = error;
        });
    }
}
