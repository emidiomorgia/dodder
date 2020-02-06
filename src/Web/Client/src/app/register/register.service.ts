import { Injectable } from '@angular/core';
import { RegisterResponse } from './register-response';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { RegisterRequest } from './register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public register(username: string, email: string, password: string, repeatPassword: string): Observable<RegisterResponse> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        let res: string;
        let errors = "";

        if (!username) {
            errors += "-Username cannot be null";
        }

        if (!password) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password cannot be null";
        }

        if (!repeatPassword) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Repeat Password cannot be null";
        }

        if (!email) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-E-Mail cannot be null";
        }

        if (password && repeatPassword && password != repeatPassword) {
            if (errors != null && errors != "") {
                errors += "<br/>"
            }
            errors += "-Password and Repeat Password cannot be different";
        }

        if (errors.length > 0) {
            return throwError(errors);
        }

        return this.http.post<RegisterResponse>('/api/core/auth/register', new RegisterRequest(username, email, password, repeatPassword), httpOptions)
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
