import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Followers } from './right-side-bar.component'
import { environment } from 'src/environments/environment'


@Injectable()
export class userFollowingService{

    constructor(private http: HttpClient){}

    usersQuery(){
        return this.http
        .get<Followers[]>(environment.backendUrl + '/account/following')
    }

}