import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { PostReact } from '../../post-shared/post-react.service';
import { Post, PostContent } from '../../post-shared/post.model';
import { PostService } from '../../post-shared/post.service';
import { Comment } from '../../post/comment/comment.model';
import { CommentService } from '../../post/comment/comment.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: PostContent;
  @ViewChild('likeCount') likeCount: ElementRef;
  @ViewChild('loveCount') loveCount: ElementRef;
  user: User
  extraOptsOpen = false
  comments: Comment[] = []
  liked: boolean = false;
  loved: boolean = false;
  baseImgUrl = 'http://127.0.0.1:8000'

  constructor(private postReactService: PostReact, 
    private renderer: Renderer2, 
    private authService: AuthService,
    private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute
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
  }

  toggleExtraOpts(){
    this.extraOptsOpen = !this.extraOptsOpen
  }

  onComment(content: string){
    this.commentService.onComment(this.post.id, content).subscribe(data => {
      const coment = new Comment(
        data['id'], 0, {
          username:this.user.username,
          first_name:this.user.first_name,
          last_name:this.user.last_name,
          id:this.user.id,
          image_url:this.user.profile_picture
        },
        content,
        new Date()
      )
      this.comments.push(coment)
      console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = this.authService.user.getValue()
      this.postService.getPost(params['id']).subscribe(post => {
        this.post = post
        console.log(post)
        this.liked = this.post.likes_post
        this.loved = this.post.loves_post
        this.commentService.getComments(this.post.id).subscribe(comments => {
          this.comments = comments
      })
      })
    })
  }

}
