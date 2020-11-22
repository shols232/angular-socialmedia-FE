import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PostPageComponent } from './container/post-page/post-page.component';
import { EditUserProfileComponent } from './container/profile/edit-user-profile/edit-user-profile.component';
import { UserProfileComponent } from './container/profile/user-profile/user-profile.component';
import { AuthGuardService } from './auth/auth-guard.service'
import { ChatContainerComponent } from './container/chat-container/chat-container.component';
import { PostListComponent } from './container/post/post-list/post-list.component';
import { PostDetailComponent } from './container/post-page/post-detail/post-detail.component';
import { CommentComponent } from './container/post/comment/comment.component';
import { EditProfileGuardService } from './container/profile/edit-user-profile/edit-profile-guard.service'

const routes: Routes = [
  { path: '', component: PostPageComponent, canActivate:[AuthGuardService, ], 
  children: [
    {path:'post/:id', component: PostDetailComponent},
    {path: 'post/:id/comment/:comment_id', component: CommentComponent},
    {path: '', component: PostListComponent, pathMatch:'full'},
  ]},
  {path: 'profile/:username', component: UserProfileComponent, canActivate:[AuthGuardService, ], children: []},
  {path: 'profile/:username/edit', component: EditUserProfileComponent, canActivate:[
    AuthGuardService, EditProfileGuardService ]},
  {path: 'auth', component: AuthComponent},
  {path: 'chats', component: ChatContainerComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
