import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';


class MockRouter {
    navigate(path) { };
}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let router = new MockRouter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AppModule],
            providers: [
                { provide: Router, useValue: router }]
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
        it('should set errorMessages with username when username is null or empty', () => {
            component.errorMessage = null;
            component.username = null;
            component.signUpClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Username') > 0).toBeTruthy();
        });
        it('should set errorMessages with email when email is null or empty', () => {
            component.errorMessage = null;
            component.email = null;
            component.signUpClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('E-Mail') > 0).toBeTruthy();
        });

        it('should set errorMessages with password when password is null or empty', () => {
            component.errorMessage = null;
            component.password = null;
            component.signUpClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Password') > 0).toBeTruthy();
        });

        it('should set errorMessages with repeat password when repeat password is null or empty', () => {
            component.errorMessage = null;
            component.repeatPassword = null;
            component.signUpClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Repeat Password') > 0).toBeTruthy();
        });

        it('should set errorMessages with different passwords when password and repeat password are different', () => {
            component.errorMessage = null;
            component.password = 'p1';
            component.repeatPassword = 'p2';
            component.signUpClicked();
            expect(component.hasErrors()).toBeTruthy();
            expect(component.errorMessage != null && component.errorMessage.indexOf('Password and Repeat Password cannot be different') > 0).toBeTruthy();
            
        });
    });
});
