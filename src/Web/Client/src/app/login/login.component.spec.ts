import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, Observable, throwError } from 'rxjs';
import { LoginResponseDTO } from './login-response-dto';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from '../app.module';
import { LoginRequestDTO } from './login-request-dto';


class MockRouter {
    navigate(path) {};
}

class MockLoginService {
    login(req : LoginRequestDTO) : Observable<LoginResponseDTO> {
        return of(new LoginResponseDTO('token'));
    }
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService =new MockLoginService();
    let router  =new MockRouter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            imports: [FormsModule, AppModule],
            providers: [
                { provide: LoginService, useValue: loginService },
                { provide: Router, useValue: router }]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    describe('hasErrors', () => {
        it('should return false if errorMessage is null or empty', () => {
            component.errorMessage = null;
            expect(component.hasErrors()).toBeFalsy();
            component.errorMessage = "";
            expect(component.hasErrors()).toBeFalsy();
        });

        it('should return true if errorMessage is not null and has value', () => {
            component.errorMessage = "error";
            expect(component.hasErrors()).toBeTruthy();
        });

    });

    describe('loginClicked', ()=>{
        it('should call loginService.login with same param',fakeAsync(()=>{
            component.errorMessage = null;
            component.password='a;'
            component.username='b';
            let calledReq : LoginRequestDTO;

            spyOn(loginService, 'login').and.callFake((req)=>{
                calledReq = req;
                return of(new LoginResponseDTO('token'));
            });
            component.loginClicked();
            tick();
            expect(loginService.login).toHaveBeenCalled();
            expect(calledReq.username).toEqual(component.username);
            expect(calledReq.password).toEqual(component.password);

        }));

        it('should set errorMessages with username when username is null or empty',()=>{
            component.errorMessage = null;
            component.username=null;
            component.loginClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Username') > 0).toBeTruthy();
        });

        it('should set errorMessages with password when password is null or empty',()=>{
            component.errorMessage = null;
            component.password=null;
            component.loginClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Password') > 0).toBeTruthy();
        });

        it('should call router.navigate["home"] when loginService returns valid LoginResponseDTO',()=>{
            component.ngOnInit();
            component.errorMessage = null;
            component.password='a;'
            component.username='b';
            spyOn(loginService, 'login').and.returnValue(of(new LoginResponseDTO('token')));
            spyOn(router, 'navigate');
            component.loginClicked();
            expect(router.navigate).toHaveBeenCalledWith(['home']);
        });

        it('should set errorMessages with error value when loginService throws error',()=>{
            component.ngOnInit();
            component.errorMessage = null;
            component.password='a;'
            component.username='b';
            let err='error';
            spyOn(loginService, 'login').and.returnValue(throwError(err));
            spyOn(router, 'navigate');
            component.loginClicked();
            expect(router.navigate).not.toHaveBeenCalled();
            expect(component.errorMessage == err).toBeTruthy();
        });
    });


});
