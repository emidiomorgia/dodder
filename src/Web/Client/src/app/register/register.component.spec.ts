import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterResponse } from './register-response';
import { Observable, of, throwError } from 'rxjs';


class MockRouter {
    navigate(path) { };
}

class MockRegisterService {
    register(username: string, email: string, password: string, repeatPassword: string): Observable<RegisterResponse> {
        return null;
    };
}


describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let router = new MockRouter();
    let registerService = new MockRegisterService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AppModule],
            providers: [
                { provide: Router, useValue: router },
                { provide: RegisterService, useValue: registerService }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('signInClicked', () => {
        it('should call router.navigate with "home" parameter', () => {
            component.ngOnInit();
            spyOn(router, 'navigate');
            component.signInClicked();
            expect(router.navigate).toHaveBeenCalledWith(['home']);
        });
    });

    describe('signUpClicked', () => {
        //it('should set errorMessages with username when username is null or empty', () => {
        //    component.errorMessage = null;
        //    component.username = null;
        //    component.signUpClicked();
        //    expect(component.hasErrors()).toBeTruthy();
        //    expect(component.errorMessage != null && component.errorMessage.indexOf('Username') > 0).toBeTruthy();
        //});
        //it('should set errorMessages with email when email is null or empty', () => {
        //    component.errorMessage = null;
        //    component.email = null;
        //    component.signUpClicked();
        //    expect(component.hasErrors()).toBeTruthy();
        //    expect(component.errorMessage != null && component.errorMessage.indexOf('E-Mail') > 0).toBeTruthy();
        //});

        //it('should set errorMessages with password when password is null or empty', () => {
        //    component.errorMessage = null;
        //    component.password = null;
        //    component.signUpClicked();
        //    expect(component.hasErrors()).toBeTruthy();
        //    expect(component.errorMessage != null && component.errorMessage.indexOf('Password') > 0).toBeTruthy();
        //});

        //it('should set errorMessages with repeat password when repeat password is null or empty', () => {
        //    component.errorMessage = null;
        //    component.repeatPassword = null;
        //    component.signUpClicked();
        //    expect(component.hasErrors()).toBeTruthy();
        //    expect(component.errorMessage != null && component.errorMessage.indexOf('Repeat Password') > 0).toBeTruthy();
        //});

        //it('should set errorMessages with different passwords when password and repeat password are different', () => {
        //    component.errorMessage = null;
        //    component.password = 'p1';
        //    component.repeatPassword = 'p2';
        //    component.signUpClicked();
        //    expect(component.hasErrors()).toBeTruthy();
        //    expect(component.errorMessage != null && component.errorMessage.indexOf('Password and Repeat Password cannot be different') > 0).toBeTruthy();
            
        //});
        it('should call registerService.login with same param', fakeAsync(() => {
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            component.email = 'c';
            component.repeatPassword = 'd';

            let calledUsername: string;
            let calledPassword: string;
            let calledEmail: string;
            let calledRepeatPassword: string;

            spyOn(registerService, 'register').and.callFake((username, email,password, repeatPassword) => {
                calledUsername = username;
                calledPassword = password;
                calledEmail = email;
                calledRepeatPassword = repeatPassword;
                return of(new RegisterResponse('token'));
            });
            component.signUpClicked();
            tick();
            expect(registerService.register).toHaveBeenCalled();
            expect(calledUsername).toEqual(component.username);
            expect(calledEmail).toEqual(component.email);
            expect(calledPassword).toEqual(component.password);
            expect(calledRepeatPassword).toEqual(component.repeatPassword);

        }));

        it('should call router.navigate["home"] when registerService returns valid RegisterResponseDTO', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            component.email = 'c';
            component.repeatPassword = 'd';
            spyOn(registerService, 'register').and.returnValue(of(new RegisterResponse('token')));
            spyOn(router, 'navigate');
            component.signUpClicked();
            expect(router.navigate).toHaveBeenCalledWith(['home']);
        });

        it('should set errorMessages with error value when registerService throws error', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            component.email = 'c';
            component.repeatPassword = 'd';
            let err = '#error#';
            spyOn(registerService, 'register').and.returnValue(throwError(err));
            spyOn(router, 'navigate');
            component.signUpClicked();
            expect(router.navigate).not.toHaveBeenCalled();
            expect(component.errorMessage).toContain(err);
        });

        it('should set loading true when registerService is called', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            component.email = 'c';
            component.repeatPassword = 'd';
            var loadingSpy = spyOnProperty(component, "loading", "set");
            spyOn(registerService, 'register').and.returnValue(of(new RegisterResponse('token')));

            component.signUpClicked();
            expect(loadingSpy).toHaveBeenCalledWith(true);
        });
    });
});
