import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  private auth: AuthService;
    router: Router;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var authenticated = this.auth.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['login']);
    }

    return true;
  }

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }
}
