import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBaseComponent } from '../shared/component-base/component-base.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends ComponentBaseComponent implements OnInit {


    public username: string;
    public email: string;
    public password: string;
    public repeatPassword: string;

    private _router: Router;

    constructor(router: Router) {
        super();
        this._router = router;
    }

    ngOnInit() {

    }

    public hasErrors(): boolean {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }

    public signInClicked() {
        this._router.navigate(['home']);
    }

    signUpClicked() {
        let errors = "";
        if (this.username == "" || this.username == null) {
            errors += "-Username cannot be empty";
        }
        if (this.email == "" || this.email == null) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-E-Mail cannot be empty";
        }
        if (this.password == "" || this.password == null) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password cannot be empty";
        }
        if (this.repeatPassword == "" || this.repeatPassword == null) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Repeat Password cannot be empty";
        }
        if (this.password && this.repeatPassword && this.password != this.repeatPassword) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password and Repeat Password cannot be different";
        }
        this.errorMessage = "In order to continue please correct the following errors:" + "<br/>" + errors;

        if (errors == "") {
            this.errorMessage = "";
            this.loading = true;
            
        }
    }
}
