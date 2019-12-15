import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-secure',
    templateUrl: './secure.component.html',
    styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
    public isCollapsed: boolean = true;
    public username : string;

    auth: AuthService;
    router: Router;


    constructor(auth: AuthService, router: Router) {
        this.auth = auth;
        this.router = router;

    }

    ngOnInit() {
    }

    public getCurrentUserName() :string {
        return this.auth.getCurrentUserName();
    }

    public signOutClicked() {
        this.auth.logout();
        this.router.navigate(['login']);
    }


}
