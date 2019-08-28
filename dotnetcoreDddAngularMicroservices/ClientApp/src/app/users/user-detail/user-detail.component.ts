import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    setPasswordEnabled: boolean = false;

    constructor() {

    }

    ngOnInit() {
            
    }

    public enableChangePassword() {
        this.setPasswordEnabled = true;
    }

}
