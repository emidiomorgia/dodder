import { TestBed, fakeAsync, async, tick } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { RegisterResponse } from './register-response';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppModule } from '../app.module';


class HttpClientMock {
    public post(url: string, body: any, options: HttpHeaders): any { return null; };
}

describe('RegisterService', () => {
    let http = new HttpClientMock();
    let registerService: RegisterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            imports: [AppModule],
            providers: [
                { provide: HttpClient, useValue: http }]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        registerService = TestBed.get(RegisterService);
    }));

    it('should be created', () => {
        const service: RegisterService = TestBed.get(RegisterService);
        expect(service).toBeTruthy();
    });

    describe("register", () => {
        it('should throw error with message when http service throws error', fakeAsync(() => {
            const expectedError = { status: 400, error: 'error' };
            let asyncErrorTest: any;
            spyOn(http, 'post').and.returnValue(throwError(expectedError));

            registerService.register('username', 'email', 'password', 'repeatPassword')
                .subscribe((asyncRes: RegisterResponse) => {

            }, (error: any) => {
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toEqual('error');
        }));
    });
});
