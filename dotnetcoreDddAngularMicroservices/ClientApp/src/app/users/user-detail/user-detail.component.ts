import { Component, OnInit } from '@angular/core';
import { UserDTO } from './user.model';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    public errorMessage : string ="";
    public setPasswordEnabled: boolean = false;
    public user : UserDTO;
    public userDetailService: UserDetailService;

    constructor(userDetailService : UserDetailService) {
        this.userDetailService = userDetailService;

        this.loadUserDetailData();
    }

    private loadUserDetailData() {
        this.userDetailService.getUserDetail().subscribe(data => {
            debugger;
            this.user = data;
        }, error => {
            debugger;
            this.errorMessage = error;
        });
    }

    ngOnInit() {

    }

    public clearErrorAlert(){
        this.errorMessage="";
    }

    public enableChangePassword() {
        this.setPasswordEnabled = true;
    }

}
