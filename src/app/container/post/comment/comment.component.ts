import { ReadPropExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { CommentService } from './comment.service';

export interface DetailPageComment{
  id: string,
  replies: any[],
  author: {
    username:string,
    first_name: string,
    last_name:string,
    id: string,
    image_url: string
},
  content: string,
  created: Date,
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comment: DetailPageComment;
  bUrl = 'http://127.0.0.1:8000'
  user: User

  constructor(private route: ActivatedRoute, 
    private commentService: CommentService, 
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.user = this.authService.user.getValue()
    this.getComment()
  }

  getComment(){
    this.route.params.subscribe(params => {
      this.commentService.getCommentWReplies(params['id'], params['comment_id']).subscribe(comment => {
        console.log(comment)
        this.comment = comment
      })
    })
  }

  onReply(reply: string){
    console.log(reply)
  }

}
