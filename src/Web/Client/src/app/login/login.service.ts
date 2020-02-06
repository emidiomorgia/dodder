import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpParams, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from './login-response';
import { LoginRequest } from './login-request';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public login(username : string, password : string): Observable<LoginResponse> {
        let res: string;
        let errors = "";

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        if (!username) {
            errors += "-Username cannot be null";
        }

        if (!password) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password cannot be null";
        }

        if (errors.length > 0) {
            return throwError(errors);
        }

        return this.http.post<LoginResponse>('/api/core/auth/login', new LoginRequest(username,password), httpOptions)
            .pipe(
                tap(item => {
                    this.setAuthKey(item.token);
                    //this.setCurrentUserName(item.name);*/
                }),
                catchError(this.handleError)
            );
    }

    private setAuthKey(token: string) {
        sessionStorage.setItem("token", token);
    }

    protected handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = err.message;
        } else {
            if (err.status >= 400 && err.status < 500) {
                errorMessage = err.error || err.message;
            } else {
                errorMessage = 'Server or communication error. Please retry later.';
            }
        }

        return throwError(errorMessage);
    }


}
