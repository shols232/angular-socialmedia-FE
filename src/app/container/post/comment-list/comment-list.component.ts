import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../comment/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  bUrl = 'http://127.0.0.1:8000'
  @Input() comments: Comment[]

  constructor() { }

  ngOnInit(): void {
  }

}
