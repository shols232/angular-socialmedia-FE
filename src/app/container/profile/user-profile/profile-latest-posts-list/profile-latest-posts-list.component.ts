import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/container/post-shared/post.service';
import { ProfileService } from '../../profile.service';
import { PostContent } from 'src/app/container/post-shared/post.model';
import { PostReact } from 'src/app/container/post-shared/post-react.service';
import { CommentService } from 'src/app/container/post/comment/comment.service';

@Component({
  selector: 'app-profile-latest-posts-list',
  templateUrl: './profile-latest-posts-list.component.html',
  styleUrls: ['./profile-latest-posts-list.component.scss'],
  providers:[PostReact, CommentService]
})
export class ProfileLatestPostsListComponent implements OnInit {
  posts: PostContent[]
  constructor(private postService:PostService) { }

  ngOnInit(): void {
      this.getLatestPosts()
  }

  getLatestPosts(){
      this.postService.getUserFeed().subscribe(posts => {
          console.log(posts)
          this.posts = posts
      })
  }

}
