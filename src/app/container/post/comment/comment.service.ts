import { Injectable } from '@angular/core'
import {  HttpClient } from '@angular/common/http'
import { Comment } from './comment.model'
import { DetailPageComment } from './comment.component'
import { User } from 'src/app/auth/user.model'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from '../../../../environments/environment'

@Injectable()
export class CommentService{

    constructor(private http: HttpClient){}

    onComment(post_id: number, content: string){
        return this.http
        .post(environment.backendUrl + '/post/comment/new', {
            post_id: post_id,
            content: content
        })
    }

    getComment(post_id: number, all=false, specific=false, comment_id?:string){
        let comment_url_string = ''
        if(comment_id){
            comment_url_string = '&comment_id=' + comment_id
        }
        return  this.http
        .get<Comment>(
            `${environment.backendUrl}/post/comments?post_id=${post_id}&all=${all}&specific=${specific}${comment_url_string}`
            )
    }

    getCommentWReplies(post_id: number, comment_id?:string){
        let comment_url_string = '&comment_id=' + comment_id
            return this.http
            .get<DetailPageComment>(
                `${environment.backendUrl}/post/comments?post_id=${post_id}&all=false&specific=true${comment_url_string}`
                )
    }

    getComments(post_id: number, all=true, specific=false){
        return  this.http
        .get<Comment[]>(
            `${environment.backendUrl}/post/comments?post_id=${post_id}&all=${all}&specific=${specific}`
            )
    }

}