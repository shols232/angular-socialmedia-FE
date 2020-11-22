import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service'

  
@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const user = this.authService.user.getValue()
      if (!user){
        return next.handle(req);
      }
      const modifiedRequest = req.clone({
        // 241c938b5f182a5c88d559827f86f34a153b1da0
        setHeaders:{
            'Authorization':`Token ${user.token}`,
        },
        withCredentials: true
    });
    return next.handle(modifiedRequest);
  }
}