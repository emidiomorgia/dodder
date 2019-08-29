import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../shared/auth.service';
import { UserRegistrationDetailDTO } from './user-registration-detail.model';
import { LoginResponseDTO } from '../shared/login-response.model';
import { ServiceBase } from '../shared/servicebase.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterService extends ServiceBase {
    http: HttpClient;
    auth: AuthService;


    constructor(http: HttpClient, auth: AuthService) {
        super();
        this.http = http;
        this.auth = auth;
    }

    public register(username: string, password: string): Observable<void> {
        let res: string;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post<void>('/api/users/register',
            new UserRegistrationDetailDTO(username, password),httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }


}
