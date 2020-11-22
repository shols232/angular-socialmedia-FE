import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/auth/user.model'
import { environment } from '../../../environments/environment'


@Injectable({providedIn: "root"})
export class UsersSearchService{

    constructor(private http: HttpClient){}

    usersQuery(query: string){
        let q_string = '?queryExists=false'
        if (query){
            q_string = '?queryExists=true&username=' + query
        }
        return this.http
        .get<User[]>(environment.backendUrl + '/post/mentions/users'+q_string)
    }

}