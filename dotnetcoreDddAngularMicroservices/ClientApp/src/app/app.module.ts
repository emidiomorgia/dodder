import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SecureComponent } from './layouts/secure/secure.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './layouts/public/public.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ValuesComponent } from './values/values.component';
import { JwtInterceptor } from './shared/jwtinterceptor.service';
import { ErrorInterceptor } from './shared/errorinterceptor.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ValuesComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
