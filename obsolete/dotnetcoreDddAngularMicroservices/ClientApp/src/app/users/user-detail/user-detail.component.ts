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
    public user : UserDTO = new UserDTO(null,null,null,null,null);
    public repeatPassword: string;
    public userDetailService: UserDetailService;
    public successMessage : string ="";

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

    public onSaveUserDetail(){
        var errors : string="";

        if (this.user.name == null ||  this.user.name == ""){
            errors += "<br/>-Name must be not empty";
        }
        if (this.user.username == null || this.user.username == ""){
            errors += "<br/>-Username must be not empty";
        }
        if (this.user.email == null || this.user.email == ""){
            errors += "<br/>-Email must be not empty";
        }
        if(this.setPasswordEnabled){
            debugger;
            if (this.user.password == null || this.user.password == ""){
                errors += "<br/>-Password must be not empty";
            }
            if (this.repeatPassword == null || this.repeatPassword == ""){
                errors += "<br/>-Repeat password must be not empty";
            }
            if (this.repeatPassword != this.user.password ){
                errors += "<br/>-Password and Repeat password must be the same";
            }
        }
        if (errors == ""){
            this.userDetailService.saveUserDetail(this.user).subscribe(
                (response)=>{
                    this.successMessage="User profile successfully saved";
                    this.clearErrorAlert();
                    setTimeout(()=>{
                        this.closeSuccessMessage();
                    },3000);
                },
                (error : string)=>{
                    this.errorMessage = error;
                });
        } else {
            this.errorMessage="In order to save please correct the following errors:" + errors;
        }
    }

    public closeSuccessMessage(){
        this.successMessage = "";
    }

    public clearErrorAlert(){
        this.errorMessage="";
    }

    public onEnableChangePassword() {
        this.setPasswordEnabled = true;
    }

    public onDisableChangePassword(){
        this.setPasswordEnabled = false;
    }

}
