import { TestBed, fakeAsync, async, tick } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { RegisterResponse } from './register-response';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppModule } from '../app.module';
import { RegisterRequest } from './register-request';


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
        it('should call http.post with URL /api/core/auth/register and with RegisterRequestDTO with correct params', fakeAsync(() => {
            const res = new RegisterResponse('token');
            const req = new RegisterRequest('username', 'email', 'password', 'password');
            let asyncResTest: RegisterResponse;
            let calledUrl: string;
            let calledBody: RegisterRequest;
            const url = '/api/core/auth/register';
            spyOn(http, 'post').and.callFake((url, body, options) => {
                calledUrl = url;
                calledBody = body;
                return of(res);
            });


            registerService.register('username', 'email', 'password', 'password')
                .subscribe((asyncRes: RegisterResponse) => {
                asyncResTest = asyncRes;

            }, (error: any) => {

            });
            tick();

            expect(http.post).toHaveBeenCalled;
            expect(asyncResTest).toEqual(res);
            expect(calledUrl).toEqual(url)
            expect(calledBody.username).toEqual('username');
            expect(calledBody.password).toEqual('password');
            expect(calledBody.email).toEqual('email');
            expect(calledBody.repeatPassword).toEqual('password');

        }));

        it('should call sessionStorage.setItem with correct token', fakeAsync(() => {
            const res = new RegisterResponse('token');
            const req = new RegisterRequest('username', 'email', 'password', 'password');

            spyOn(http, 'post').and.returnValue(of(res));
            spyOn(sessionStorage, 'setItem');
            let asyncResTest: RegisterResponse;

            registerService.register('username', 'email', 'password', 'password')
                .subscribe((asyncRes: RegisterResponse) => {
                asyncResTest = asyncRes;

            }, (error: any) => {

            });

            tick();

            expect(sessionStorage.setItem).toHaveBeenCalledWith('token', 'token');


        }));

        it('should throw error with message when http service throws error', fakeAsync(() => {
            const expectedError = { status: 400, error: 'error' };
            let asyncErrorTest: any;
            spyOn(http, 'post').and.returnValue(throwError(expectedError));

            registerService.register('username', 'email', 'password', 'password')
                .subscribe((asyncRes: RegisterResponse) => {

            }, (error: any) => {
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toEqual('error');
        }));

        it('should throw error with message username when username is missing', fakeAsync(() => {
            let asyncErrorTest: any;

            registerService.register(null, 'email', 'password', 'password')
                .subscribe((asyncRes: RegisterResponse) => {

            }, (error: any) => {
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toContain('Username');


        }));

        it('should throw error with message email when email is missing', fakeAsync(() => {
            let asyncErrorTest: any;

            registerService.register('username', null, 'password', 'password')
                .subscribe((asyncRes: RegisterResponse) => {

                }, (error: any) => {
                    asyncErrorTest = error;
                });
            tick();

            expect(asyncErrorTest).toContain('E-Mail');

        }));

        it('should throw error with message password when password is missing', fakeAsync(() => {
            let asyncErrorTest: any;

            registerService.register('username', 'email', null, 'password')
                .subscribe((asyncRes: RegisterResponse) => {

                }, (error: any) => {
                    asyncErrorTest = error;
                });
            tick();

            expect(asyncErrorTest).toContain('Password');

        }));

        it('should throw error with message repeat password when repeat password is missing', fakeAsync(() => {
            let asyncErrorTest: any;

            registerService.register('username', 'email', 'password', null)
                .subscribe((asyncRes: RegisterResponse) => {

                }, (error: any) => {
                    asyncErrorTest = error;
                });
            tick();

            expect(asyncErrorTest).toContain('Repeat Password');

        }));

        it('should throw error with message password and repeat password not equals when password repeat password are not equals', fakeAsync(() => {
            let asyncErrorTest: any;

            registerService.register('username', 'email', 'password', 'password2')
                .subscribe((asyncRes: RegisterResponse) => {

                }, (error: any) => {
                    asyncErrorTest = error;
                });
            tick();

            expect(asyncErrorTest).toContain('Password and Repeat Password cannot be different');

        }));
    });
});
