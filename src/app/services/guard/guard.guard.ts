import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAdmin: boolean = false;

  constructor(public auth: AuthService, public router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isAdmin = this.auth.isAdmin;
      if (!this.isAdmin) {
        console.log("Is logged in", this.isAdmin)
        this.router.navigate(['/dashboard']);
        return true;
      }
      console.log("Is logged in", this.isAdmin)
    return true;
  }
}
