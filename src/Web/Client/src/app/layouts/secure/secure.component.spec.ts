import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SecureComponent } from './secure.component';
import { Router } from '@angular/router';
import { SecureService } from './secure.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';

declare var $: any;

class MockRouter {
    navigate(path) {};
}

class MockSecureService {
    emptyAuthKey() {};
}

describe('SecureComponent', () => {
  let component: SecureComponent;
  let fixture: ComponentFixture<SecureComponent>;
  let router  =new MockRouter();
  let secureService = new MockSecureService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports:[FormsModule, AppRoutingModule, AppModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: SecureService, useValue: secureService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('logoutClicked',()=>{
      it('should call emptyAuthKey on secureService',()=>{
        spyOn(secureService, 'emptyAuthKey');
        component.logoutClicked();
        expect(secureService.emptyAuthKey).toHaveBeenCalled();
      });

      it('should call navigate on router',()=>{
        spyOn(router, 'navigate');
        component.logoutClicked();
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });
  });
});
