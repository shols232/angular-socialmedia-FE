import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, tap, take } from 'rxjs/operators';
  
  import { AuthService } from '../../../auth/auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class EditProfileGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.authService.user.pipe(
        take(1),
        map(user => {
        if(route.params['username'] == user.username){
            return true
        }
            return this.router.createUrlTree(['/'])
        //   return this.router.createUrlTree(['/auth']);
        })
      );
    }
  }
  