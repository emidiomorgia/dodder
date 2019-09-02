import { Component, OnInit } from '@angular/core';
import { UserDTO } from './userDTO.model';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    public errorMessage : string ="";
    public setPasswordEnabled: boolean = false;
    public user : UserDTO = new UserDTO(null,null,null,null);
    public userDetailService: UserDetailService;

    constructor(userDetailService : UserDetailService) {
        this.userDetailService = userDetailService;

        this.loadUserDetailData();
    }

    private loadUserDetailData() {
        this.userDetailService.getUserDetail().subscribe(data => {
            this.user = data;
        }, error => {
            this.errorMessage = error;
        });
    }

    ngOnInit() {

    }

    public saveUserDetail(){
        debugger;
        var errors : string="";
        if (this.user.name == null ||  this.user.name == ""){
            errors += "-Name must be not empty";
        }
        if (this.user.username == null || this.user.username == ""){
            errors += "-Username must be not empty";
        }
        if (this.user.email == null || this.user.email == ""){
            errors += "-Email must be not empty";
        }
        if (errors == ""){
            this.userDetailService.saveUserDetail(this.user).subscribe(
                (response)=>{

                },
                (error : string)=>{
                    this.errorMessage = error;
                });
        } else {
            this.errorMessage="In order to save please correct the following errors:" + errors;
        }
    }

    public clearErrorAlert(){
        this.errorMessage="";
    }

    public enableChangePassword() {
        this.setPasswordEnabled = true;
    }

}
