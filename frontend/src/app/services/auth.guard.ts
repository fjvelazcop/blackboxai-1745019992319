import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/login']);
        }
        const expectedRoles = route.data['roles'] as Array<string>;
        if (expectedRoles && expectedRoles.length > 0) {
          const token = this.authService.getToken();
          if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userRole = payload.role;
            if (expectedRoles.includes(userRole)) {
              return true;
            } else {
              // Redirect to unauthorized page or login
              return this.router.createUrlTree(['/login']);
            }
          } else {
            return this.router.createUrlTree(['/login']);
          }
        }
        return true;
      })
    );
  }
}
