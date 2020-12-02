import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PostContent } from '../../post-shared/post.model';
import { PostReact } from '../../post-shared/post-react.service'
import { User } from 'src/app/auth/user.model';
import { PostService } from '../../post-shared/post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.model'
import { Router } from '@angular/router';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers:[]
})
export class PostComponent implements OnInit {
  @Input() post: PostContent;
  @ViewChild('likeCount') likeCount: ElementRef;
  @ViewChild('loveCount') loveCount: ElementRef;
  user: User
  extraOptsOpen = false
  comment: Comment
  liked: boolean = false;
  loved: boolean = false;

  constructor(private postReactService: PostReact, 
    private renderer: Renderer2, 
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
    ) { }

  toggleLike(){
      const action = this.liked ? 'unlike' : 'like'
      this.postReactService.likePost(action, this.post.id).subscribe(data => {
        if(data['success']){
          const likeIns = this.likeCount.nativeElement
          const currentCount = parseInt(likeIns.innerText)
          if (action == 'like'){
            this.renderer.setProperty(likeIns, 'innerText', currentCount + 1)
          }else{
            this.renderer.setProperty(likeIns, 'innerText', currentCount - 1)
          }
          this.liked = !this.liked
        }
      })
  }

  toggleLove(){
    const action = this.loved ? 'unlike' : 'like'
      this.postReactService.lovePost(action, this.post.id).subscribe(data => {
        if(data['success']){
          const loveIns = this.loveCount.nativeElement
          const currentCount = parseInt(loveIns.innerText)
          if (action == 'like'){
            this.renderer.setProperty(loveIns, 'innerText', currentCount + 1)
          }else{
            this.renderer.setProperty(loveIns, 'innerText', currentCount - 1)
          }
          this.loved = !this.loved
        }
      })
    console.log(this.liked ? 'unloved' : 'loved');
  }

  toggleExtraOpts(){
    this.extraOptsOpen = !this.extraOptsOpen
    console.log(this.extraOptsOpen)
  }

  onComment(content: string){
    this.commentService.onComment(this.post.id, content).subscribe(data => {
      this.router.navigate(['./post', this.post.id])
    })
  }

  ngOnInit(): void {

    console.log(this.post)
    this.liked = this.post.likes_post
    this.loved = this.post.loves_post
    this.user = this.authService.user.getValue()
    console.log('11', this.user)
    this.commentService.getComment(this.post.id).subscribe(comment => {
      if(comment.author.username != ''){
        this.comment = comment
      }
    })
  }

}
