import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenResponseDTO } from './registration-response.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    http: HttpClient;
    private AUTH_KEY = "auth-key";

    constructor(http: HttpClient) {
        this.http = http;
    }

    logout() {
        localStorage.removeItem(this.AUTH_KEY);
    }

    public isAuthenticated(): boolean {
        var authKey = this.getAuthKey();
        return authKey != null && authKey.length > 0;
    }

    public getAuthKey() : string{
        return localStorage.getItem(this.AUTH_KEY);
    }

    public login(username: string, password: string): Observable<TokenResponseDTO> {
        let res: string;
        const httpParams = new HttpParams()
        .set("username", username)
        .set("password", password);

        return this.http.get<TokenResponseDTO>('/api/users/login', { params: httpParams } )

        .pipe(
                catchError(this.handleError)
            );
    }

    public setAuthKey(authKey: string) {
        localStorage.setItem(this.AUTH_KEY, authKey);
    }

    private handleError(err : HttpErrorResponse) {
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
