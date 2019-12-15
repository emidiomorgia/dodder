import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { LoginResponseDTO } from './login-response.model';
import { ServiceBase } from './servicebase.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService extends ServiceBase{

    http: HttpClient;
    private AUTH_KEY = "auth-key";
    private USERNAME_KEY = "username-key";

    constructor(http: HttpClient) {
        super();
        this.http = http;
    }

    logout() {
        localStorage.removeItem(this.AUTH_KEY);
        localStorage.removeItem(this.USERNAME_KEY)
    }

    public isAuthenticated(): boolean {
        var authKey = this.getAuthKey();
        return authKey != null && authKey.length > 0;
    }

    public getAuthKey() : string{
        return localStorage.getItem(this.AUTH_KEY);
    }

    public setAuthKey(authKey: string) {
        localStorage.setItem(this.AUTH_KEY, authKey);
    }

    public getCurrentUserName() : string{
        return localStorage.getItem(this.USERNAME_KEY);
    }

    public setCurrentUserName(username: string) {
        localStorage.setItem(this.USERNAME_KEY, username);
    }

    public login(username: string, password: string): Observable<LoginResponseDTO> {
        let res: string;
        const httpParams = new HttpParams()
        .set("username", username)
        .set("password", password);

        return this.http.get<LoginResponseDTO>('/api/users/login', { params: httpParams } )
            .pipe(
                tap(item => {
                    this.setAuthKey(item.token);
                    this.setCurrentUserName(item.name);
                }),
                catchError(this.handleError)
            );
    }
}
