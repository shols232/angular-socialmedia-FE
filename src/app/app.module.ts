import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MentionModule } from 'angular-mentions';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './navigation/side-bar/side-bar.component';
import { PostPageComponent } from './container/post-page/post-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './container/post/post-list/post-list.component';
import { PostComponent } from './container/post/post/post.component';
import { UserProfileComponent } from './container/profile/user-profile/user-profile.component';
import { EditUserProfileComponent } from './container/profile/edit-user-profile/edit-user-profile.component';
import { AuthInterceptorService } from './container/app-shared/request-interceptor.service'
import { CookieService } from 'ngx-cookie-service';
import { AuthComponent } from './auth/auth.component';
import { ChatContainerComponent } from './container/chat-container/chat-container.component';
import { ChatListComponent } from './container/chat-container/chat-list/chat-list.component';
import { ChatMessageComponent } from './container/chat-container/chat-message/chat-message.component';
import { RightSideBarComponent } from './container/post-page/right-side-bar/right-side-bar.component';
import { CommentComponent } from './container/post/comment/comment.component';
import { PostDetailComponent } from './container/post-page/post-detail/post-detail.component';
import { PostCommentsPreviewComponent } from './container/post/post/post-comments-preview/post-comments-preview.component';
import { CommentListComponent } from './container/post/comment-list/comment-list.component';
import { ProfileLatestPostsListComponent } from './container/profile/user-profile/profile-latest-posts-list/profile-latest-posts-list.component';
import 'boxicons';
import { LeftSideBarComponent } from './container/post-page/left-side-bar/left-side-bar.component'
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { LoaderComponent } from './container/app-shared/loader/loader.component';
import { SettingsPageComponent } from './container/settings-page/settings-page.component';
import { ErrorMsgComponent } from './container/app-shared/error-msg/error-msg.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    PostPageComponent,
    PostListComponent,
    PostComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    AuthComponent,
    ChatContainerComponent,
    ChatListComponent,
    ChatMessageComponent,
    RightSideBarComponent,
    CommentComponent,
    PostDetailComponent,
    PostCommentsPreviewComponent,
    CommentListComponent,
    ProfileLatestPostsListComponent,
    LeftSideBarComponent,
    LoaderComponent,
    SettingsPageComponent,
    ErrorMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContenteditableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MentionModule,
    AdsenseModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  CookieService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
