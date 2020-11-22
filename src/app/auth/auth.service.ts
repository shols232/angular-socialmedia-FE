import { Injectable } from '@angular/core'
import { BehaviorSubject, throwError } from 'rxjs'
import { User } from './user.model'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, last, tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'


@Injectable({providedIn: 'root'})
export class AuthService{
    user: BehaviorSubject<User> = new BehaviorSubject<User>(null)

    constructor(private http: HttpClient, 
        private cookies: CookieService, 
        private router: Router
        ){}

    logIn(username: string, password: string){
       return this.http
       .post<{profile_picture:string, id:string, first_name: string, last_name:string, token:string}>(
           environment.backendUrl + '/account/login', {
            username:username,
            password:password,
        })
        .pipe(
            tap((resData) => {
                console.log(resData)
                const user = new User(resData.id, username, resData.profile_picture,
                    resData.first_name, resData.last_name, resData.token)
                this.user.next(user)
                this.cookies.set('user', JSON.stringify(user))
                console.log(this.cookies.get('user'))
            })
        )
    }

    signUp(username:string, email:string, first_name: string, 
        last_name:string, password:string){
        return this.http
        .post<{profile_picture:string, id:string, first_name: string, last_name:string, token:string}>(
            environment.backendUrl + '/account/new', {
            username:username,
            email:email,
            first_name:first_name,
            last_name:last_name,
            password:password
        })
        .pipe(
            catchError(error => this.handleErrors(error)),
            tap(resData => {
            const user = new User(resData.id,username, resData.profile_picture, 
                resData.first_name, resData.last_name, resData.token)
            this.user.next(user)
            this.cookies.set('user', JSON.stringify(user))
        })
        )
    }

    autoLogin(){
        let userCookie = this.cookies.get('user')
        if (userCookie){
            const user: User = JSON.parse(userCookie)
            console.log(user)
            this.user.next(user)
        }
    }

    logOut(){
        this.user.next(null)
        this.cookies.delete('user')
        this.router.navigate(['/auth'])
    }

    private handleErrors(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = 'username or password does not exist.';
                break;
        }
        return throwError(errorMessage);
    }

}
