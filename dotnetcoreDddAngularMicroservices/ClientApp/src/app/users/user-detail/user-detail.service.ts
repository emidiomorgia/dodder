import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
    http: HttpClient;

    constructor(http : HttpClient) {
        this.http = http;
    }

    public getUserDetail(){
        this.http.get<UserDTO>('/api/users/edit')
        .subscribe(
          data => {
            debugger;

          },
          error =>{
            debugger;
          }
        )
    }

}
