import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({providedIn: 'root'})
export class SettingsService{

    constructor(
        private http: HttpClient
    ){}
    
    getSettings(){
        return this.http
        .get<{
            enable_follow_me:boolean,
            enable_message_me:boolean,
            enable_tagging:boolean
        }>(environment.backendUrl + '/account/settings/details')
    }

    updateSetting(enable_follow_me=true, enable_message_me=true, enable_tagging=true){
        return this.http
        .post(environment.backendUrl + '/account/settings', {
            enable_follow_me:enable_follow_me,
            enable_message_me:enable_message_me,
            enable_tagging:enable_tagging
        })
    }
    
}