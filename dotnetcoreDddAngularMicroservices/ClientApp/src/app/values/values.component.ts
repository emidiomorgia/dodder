import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/internal/operators';
import { LoginResponseDTO } from '../shared/login-response.model';


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

    this.http.get<LoginResponseDTO>('/api/users/values')
        .subscribe(
          data => {

            this.values = data.token;
          },
          error =>{

          }
        )
}

private handleError(err: HttpErrorResponse) {

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
