import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserDTO } from './userDTO.model';
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
        return this.http.get<UserDTO>('/api/users/editprofile' )
            .pipe(
                catchError(this.handleError)
            );
    }

    public saveUserDetail(user : UserDTO): Observable<void> {

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post<void>('/api/users/editprofile',
            user,httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }
}
