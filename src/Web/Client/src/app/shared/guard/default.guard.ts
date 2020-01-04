import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultGuard implements CanActivate {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let token: string = sessionStorage.getItem('token');
    
    if (token == null || token.length == 0) {
      this.router.navigate(['login']);
      return false;
    } 
    
    return true;
  }

}


