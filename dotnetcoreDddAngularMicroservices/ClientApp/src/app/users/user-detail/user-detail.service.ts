import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UserDTO } from './user.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ServiceBase } from 'src/app/shared/servicebase.service';
import { LoginResponseDTO } from 'src/app/shared/login-response.model';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService extends ServiceBase {
    http: HttpClient;

    constructor(http : HttpClient) {
        super();
        this.http = http;
    }

    public getUserDetail(): Observable<UserDTO> {
        let res: string;

        return this.http.get<UserDTO>('/api/users/editprofile' )
            .pipe(
                tap(item => {
                   debugger;
                }),
                catchError(this.handleError)
            );
    }
}
