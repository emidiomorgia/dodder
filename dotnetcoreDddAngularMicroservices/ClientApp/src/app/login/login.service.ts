import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { TokenResponseDTO } from '../register/registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public login(username: string, password: string): Observable<TokenResponseDTO> {
        let res: string;
        const httpParams = new HttpParams()
        .set("username", username)
        .set("password", password);

        return this.http.get<TokenResponseDTO>('/api/users/login', { params: httpParams })
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
