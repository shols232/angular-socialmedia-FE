import { Component, Input, OnInit } from '@angular/core';
import { PostContent } from '../../post-shared/post.model';
import { PostService } from '../../post-shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postsPassedAsInput: boolean = false
  @Input() posts: PostContent[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if (!this.postsPassedAsInput){
      this.postService.getPosts().subscribe(data => {
        this.posts.push(...data.body)
      }) 
    }
    this.postService.newPostSubject.subscribe(post => {
      this.posts.unshift(post)
    })
  }

}
