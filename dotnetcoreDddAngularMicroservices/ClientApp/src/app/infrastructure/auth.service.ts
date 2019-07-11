import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated(): boolean {
    var authKey = localStorage.getItem("auth-key");
    return authKey != null && authKey.length > 0;
  }

  constructor() { }
}
