import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Post } from '../post-shared/post.model';
import { PostService } from '../post-shared/post.service'
import { UsersSearchService } from '../app-shared/user-query.service'
import { CommentService } from 'src/app/container/post/comment/comment.service'
import { PostReact } from '../post-shared/post-react.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  providers: [CommentService, PostReact]
})
export class PostPageComponent implements OnInit {
  selectedFile: File;
  userItems : User[] = []
  hashItems = []
  content: any;
  @ViewChild('contentEditable') contentEditable: ElementRef
  htmlToAdd ='<div><strong>hiiii</strong></div>'
  contentEditableControl: FormControl = new FormControl();

  constructor(
    private postService: PostService, 
    private usersQuery: UsersSearchService, 
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }

  onSubmit(form: NgForm){
    const formData = form.value
    const post = new Post(this.contentEditableControl.value)
    
    if (this.selectedFile){
      post.image_content = this.selectedFile
    }
    console.log(formData,'ll', formData, post)
    this.postService.createPost(post)
    this.contentEditableControl.reset()
    console.log(formData, this.contentEditableControl.value)
  }

  mentionConfig(): any{
    const formCtrl = this.contentEditableControl
    let mentionConfig = {
      mentions: [
          {
              items: this.userItems,
              triggerChar: '@',
              labelKey:'username',
              mentionSelect(text: any) {
                let value = formCtrl.value
                formCtrl.setValue(value + `<span 
                contenteditable="false"
                ng-reflect-router-link="/profile/${text.username}"
                href="/profile/${text.username}"
                class="user-mention">${text.username}</span>` + ' ')
                return ' ';
                
              }
          },
          {
              items: this.hashItems,
              triggerChar: '#'
          },
      ]
    }
    return mentionConfig
  }

  mentionSearch(query?: string){
    console.log(query)
    if (query){
      this.usersQuery.usersQuery(query).subscribe(users => {
        console.log(1,users)
        this.userItems = users
      })
    }else{
      this.usersQuery.usersQuery(query).subscribe(users => {
        this.userItems = users
        console.log('opened',users)
      })
    }
  }

}
