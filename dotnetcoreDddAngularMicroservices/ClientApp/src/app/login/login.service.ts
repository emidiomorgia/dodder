import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


}
