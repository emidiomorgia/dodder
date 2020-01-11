import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponseDTO } from './login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http: HttpClient;

  constructor(http : HttpClient) {
    this.http = http;
  }

  login(username: string, password: string) : Observable<LoginResponseDTO> {
    let res: string;
        const httpParams = new HttpParams()
        .set("username", username)
        .set("password", password);
debugger;
        return this.http.post<LoginResponseDTO>('/core/auth/login', { params: httpParams } )
            .pipe(
                tap(item => {
                  debugger;
                    /*this.setAuthKey(item.token);
                    this.setCurrentUserName(item.name);*/
                }),
                catchError(this.handleError)
            );
  }

  protected handleError(err : HttpErrorResponse) {
debugger;
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
