import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor() { }

  public emptyAuthKey(){
    sessionStorage.removeItem('token');
  }
}
