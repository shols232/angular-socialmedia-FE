import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Profile } from './profile.model'
import { environment } from '../../../environments/environment'

@Injectable({providedIn: 'root'})
export class ProfileService{

    constructor(
        private http: HttpClient
    ){}

    getUserProfile(username: string){
        return this.http
        .get<Profile>(environment.backendUrl + '/account/profile?username='+username)
    }

    updateProfile(username: string, form:FormData){
        return this.http
        .post(environment.backendUrl + '/account/profile?username='+username, form)
    }

    toggleFollow(action:string, username:string){
        return this.http
        .post(environment.backendUrl + '/account/profile/follow_unfollow', {
            action:action,
            username:username
        })
    }
}