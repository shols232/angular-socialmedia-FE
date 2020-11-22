import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Followers } from './right-side-bar.component'


@Injectable()
export class userFollowingService{

    constructor(private http: HttpClient){}

    usersQuery(){
        return this.http
        .get<Followers[]>('http://127.0.0.1:8000/account/following')
    }

}