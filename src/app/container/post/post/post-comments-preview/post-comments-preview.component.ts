import { Component, Input, OnInit } from '@angular/core';
import { PostContent } from 'src/app/container/post-shared/post.model';
import { Comment } from '../../comment/comment.model';

@Component({
  selector: 'app-post-comments-preview',
  templateUrl: './post-comments-preview.component.html',
  styleUrls: ['./post-comments-preview.component.scss']
})
export class PostCommentsPreviewComponent implements OnInit {
  @Input() comment : Comment;
  @Input() comments_count: number;
  @Input() post_id: number;
  bUrl = 'https://vhoid.s3.us-east-2.amazonaws.com'
  constructor() { }

  ngOnInit(): void {
  }

}
