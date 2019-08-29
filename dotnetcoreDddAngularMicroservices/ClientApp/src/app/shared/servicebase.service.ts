import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ServiceBase {
    protected handleError(err : HttpErrorResponse) {

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
