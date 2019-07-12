import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    logout() {
        localStorage.removeItem(this.AUTH_KEY);

    }

    private AUTH_KEY = "auth-key";

    public isAuthenticated(): boolean {
        var authKey = localStorage.getItem(this.AUTH_KEY);
        return authKey != null && authKey.length > 0;
    }

    public login(username: string, password: string) {
        this.setAuthKey("test");
    }

    public setAuthKey(authKey: string) {
        localStorage.setItem(this.AUTH_KEY, authKey);
    }
    
}
