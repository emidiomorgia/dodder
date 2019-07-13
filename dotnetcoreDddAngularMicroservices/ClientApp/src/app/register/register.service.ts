import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegistrationResponseModel } from './registration-response.model';
import { AuthService } from '../shared/auth.service';
import { UserRegistrationDetailModel } from './user-registration-detail.model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    http: HttpClient;
    auth: AuthService;


    constructor(http: HttpClient, auth: AuthService) {
        this.http = http;
        this.auth = auth;
    }

    public register(username: string, password: string): Observable<RegistrationResponseModel> {
        let res: string;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post<RegistrationResponseModel>('/api/users/register',
            new UserRegistrationDetailModel(username, password),httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }

    private handleError(err: HttpErrorResponse) {
        debugger;
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = err.message;
        } else {
            if (err.status >= 400 && err.status < 500) {
                errorMessage = err.error;
            } else {
                errorMessage = 'Server or communication error. Please retry later.';
            }

        }

        return throwError(errorMessage);
    }
}
