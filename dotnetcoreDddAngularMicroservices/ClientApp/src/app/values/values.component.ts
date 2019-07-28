import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { TokenResponseDTO } from '../register/registration-response.model';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  public values : string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  public valuesClicked() {
    let res: string;
debugger;
    this.http.get<TokenResponseDTO>('/api/users/values')
        .subscribe(
          data => {
            debugger;
            this.values = data.token;
          },
          error =>{
            debugger;
          }
        )
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
