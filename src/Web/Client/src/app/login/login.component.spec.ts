import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, Observable, throwError } from 'rxjs';
import { LoginResponse } from './login-response';
import { AppModule } from '../app.module';



class MockRouter {
    navigate(path) { };
}

class MockLoginService {
    login(username : string, password: string): Observable<LoginResponse> {
        return of(new LoginResponse('token'));
    }
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService = new MockLoginService();
    let router = new MockRouter();

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

    describe('loginClicked', () => {
        it('should call loginService.login with same param', fakeAsync(() => {
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            let calledUsername: string;
            let calledPassword: string;

            spyOn(loginService, 'login').and.callFake((username, password) => {
                calledUsername = username;
                calledPassword = password;
                return of(new LoginResponse('token'));
            });
            component.loginClicked();
            tick();
            expect(loginService.login).toHaveBeenCalled();
            expect(calledUsername).toEqual(component.username);
            expect(calledPassword).toEqual(component.password);

        }));

        it('should call router.navigate["home"] when loginService returns valid LoginResponseDTO', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            spyOn(loginService, 'login').and.returnValue(of(new LoginResponse('token')));
            spyOn(router, 'navigate');
            component.loginClicked();
            expect(router.navigate).toHaveBeenCalledWith(['home']);
        });

        it('should set errorMessages with error value when loginService throws error', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            let err = '#error#';
            spyOn(loginService, 'login').and.returnValue(throwError(err));
            spyOn(router, 'navigate');
            component.loginClicked();
            expect(router.navigate).not.toHaveBeenCalled();
            expect(component.errorMessage).toContain(err);
        });

        it('should set loading true when loginService is called', () => {
            component.ngOnInit();
            component.errorMessage = null;
            component.password = 'a;'
            component.username = 'b';
            var loadingSpy=spyOnProperty(component, "loading", "set");
            spyOn(loginService, 'login').and.returnValue(of(new LoginResponse('token')));
            
            component.loginClicked();
            expect(loadingSpy).toHaveBeenCalledWith(true);
        });
    });

    describe('registerClicked', () => {

        it('should call router.navigate("register")', () => {
            component.ngOnInit();
            spyOn(router, 'navigate');
            component.registerClicked();
            expect(router.navigate).toHaveBeenCalledWith(['register']);
        });

        
    });


});
