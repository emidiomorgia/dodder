import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistrationResponseModel } from './registration-response.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public register(username: string, password: string): Observable<RegistrationResponseModel> {
        let res: string;

        return this.http.post<RegistrationResponseModel>('/api/users/register', null )
            .pipe(
                tap(data => {
                    debugger;
                    this.setAuthToken(data.token)
                }),
                catchError(this.handleError)
            )
    }

    private handleError(err: HttpErrorResponse) {
        debugger;
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = err.message;
        } else {
            if (err.status >= 400 && err.status < 500) {
                errorMessage = err.error.message;
            } else {
                errorMessage = `Server or communication error: ${err.message}`;
            }

        }

        return throwError(errorMessage);
    }
}
