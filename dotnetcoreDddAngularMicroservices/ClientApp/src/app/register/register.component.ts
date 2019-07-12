import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public username: string="";
    public password: string="";
    public password2: string="";

    public usernameError: string="";
    public passwordError:string=""
    public password2Error: string="";

    constructor() { }

    ngOnInit() {
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

    }

}
