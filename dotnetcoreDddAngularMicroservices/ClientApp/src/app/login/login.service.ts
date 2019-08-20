import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { TokenResponseDTO } from '../shared/registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


}
