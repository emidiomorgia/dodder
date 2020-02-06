import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBaseComponent } from '../shared/component-base/component-base.component';
import { RegisterService } from './register.service';

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

    private router: Router;
    private registerService: RegisterService;

    constructor(router: Router, registerService: RegisterService) {
        super();
        this.router = router;
        this.registerService = registerService;
    }

    ngOnInit() {

    }

    public hasErrors(): boolean {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }

    public signInClicked() {
        this.router.navigate(['home']);
    }

    public signUpClicked() {
        this.errorMessage = "";
        this.loading = true;

        this.registerService.register(this.username, this.email, this.password, this.repeatPassword)
            .subscribe(
            data => {
                this.loading = false;
                this.router.navigate(['home']);
            },
            error => {
                this.loading = false;
                this.errorMessage = "In order to continue please correct the following errors:" + "<br/>" + error;

            });
    }
}
