import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpParams, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponseDTO } from './login-response-dto';
import { LoginRequestDTO } from './login-request-dto';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public login(username: string, password: string): Observable<LoginResponseDTO> {
        let res: string;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const req = new LoginRequestDTO(username, password);
        return this.http.post<LoginResponseDTO>('/api/core/auth/login', req, httpOptions)
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
