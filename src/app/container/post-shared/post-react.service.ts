import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class PostReact{
    private baseUrl = environment.backendUrl + '/post/react/'
    constructor(private http: HttpClient){}

    likePost(action: string, postId:number){
       return this.http
        .post(this.baseUrl, {
            action:action,
            react:'like',
            post_id:postId
        })
    }

    lovePost(action: string, postId:number){
        return this.http
         .post(this.baseUrl, {
             action:action,
             react:'love',
             post_id:postId
         })
     }
}