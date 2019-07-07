import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponentComponent } from './layouts/public/public-component/public-component.component';
import { PublicComponent } from './layouts/public/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
@NgModule({
  declarations: [
    AppComponent,
    PublicComponentComponent,
    PublicComponent,
    SecureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
