import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.fireAuth.authState.pipe(
        map(user => {
          if (user) {
            return !route.data?.authComponents || this.router.parseUrl('/dashboard')
          } else {
            return route.data?.authComponents || this.router.parseUrl('/login')
          }
        })
      )
  }
}
