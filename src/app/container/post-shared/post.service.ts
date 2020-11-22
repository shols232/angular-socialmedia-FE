import { Injectable } from '@angular/core'
import { Post, PostContent } from './post.model';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({providedIn:'root'})
export class PostService{
    private baseUrl = environment.backendUrl
    private posts: Post[];

    constructor(private http: HttpClient){}
    
    
    createPost(post: Post){
        const urlPath = this.baseUrl + '/post/create/'
        const form = new FormData()
        form.append('content',  post.content)
        if(post.image_content){
            form.append('image_content', post.image_content)
        }
        this.http
        .post(urlPath, form)
        .subscribe(data => {
            console.log(data)
        })
    }

    getPosts(){
        const urlPath = this.baseUrl + '/post/list';
        return this.http
        .get<PostContent[]>(urlPath, {
            observe:'response'
        })
    }

    getPost(post_id: string){
        const urlPath = this.baseUrl + '/post/detail?post_id='+post_id;
        return this.http
        .get<PostContent>(urlPath)
    }

    getUserFeed(){
        const urlPath = this.baseUrl + '/post/feed'
        return this.http
        .get<PostContent[]>(urlPath)
    }
}