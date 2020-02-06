import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppModule } from '../app.module';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';

class HttpClientMock {
    public post(url: string, body: any, options: HttpHeaders): any { return null; };
}

describe('LoginService', () => {
    let http = new HttpClientMock();
    let loginService: LoginService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            imports: [AppModule],
            providers: [
                { provide: HttpClient, useValue: http }]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        loginService = TestBed.get(LoginService);
    }));



    describe('login', () => {

        it('should call http.post with URL /api/core/auth/login and with LoginRequestDTO with correct username and password', fakeAsync(()=>{
            const res = new LoginResponse('token');
            const req = new LoginRequest('username', 'password');
            let asyncResTest :LoginResponse;
            let calledUrl : string;
            let calledBody: LoginRequest;
            const url='/api/core/auth/login';
            spyOn(http, 'post').and.callFake((url, body, options)=>{
                calledUrl=url;
                calledBody = body;
                return of(res);
            });


            loginService.login('username','password').subscribe((asyncRes: LoginResponse)=>{
                asyncResTest =asyncRes;

            }, (error : any)=>{

            });
            tick();

            expect(http.post).toHaveBeenCalled;
            expect(asyncResTest).toEqual(res);
            expect(calledUrl).toEqual(url)
            expect(calledBody.username).toEqual('username');
            expect(calledBody.password).toEqual('password');

        }));

        it('should call sessionStorage.setItem with correct token', fakeAsync(()=>{
            const res = new LoginResponse('token');
            const req = new LoginRequest('username', 'password');

            spyOn(http, 'post').and.returnValue(of(res));
            spyOn(sessionStorage,'setItem');
            let asyncResTest :LoginResponse;

            loginService.login('username','password').subscribe((asyncRes: LoginResponse)=>{
                asyncResTest =asyncRes;

            }, (error : any)=>{

            });

            tick();

            expect(sessionStorage.setItem).toHaveBeenCalledWith('token','token');


        }));

        it('should throw error with message when http service throws error', fakeAsync(()=>{
            const expectedError = { status : 400, error : 'error'};
            let asyncErrorTest : any;
            spyOn(http, 'post').and.returnValue(throwError(expectedError));


            loginService.login('username','password').subscribe((asyncRes: LoginResponse)=>{

            }, (error : any)=>{
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toEqual('error');


        }));

        it('should throw error with message username when username is missing', fakeAsync(() => {
            let asyncErrorTest: any;

            loginService.login(null, 'password').subscribe((asyncRes: LoginResponse) => {

            }, (error: any) => {
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toContain('Username');


        }));
        it('should throw error with message password when username is missing', fakeAsync(() => {
            let asyncErrorTest: any;
 
            loginService.login('username', null).subscribe((asyncRes: LoginResponse) => {

            }, (error: any) => {
                asyncErrorTest = error;
            });
            tick();

            expect(asyncErrorTest).toContain('Password');

        }));
    });
});
