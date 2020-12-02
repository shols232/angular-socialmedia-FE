import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { Chat } from './chat-list/chat.model';
import { ChatService } from './chat.service'


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
  providers:[ChatService, ]
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  chatOpened: boolean = false;
  currentChat: Chat;
  chatServiceObs: Subject<Chat>;


  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.currentChat.subscribe(chat => {
      if(chat){
        this.currentChat = chat
        this.chatOpened = true;
        console.log(this.currentChat)
      }
    })
  }

  backToList(){
    console.log('miskata')
    this.chatOpened = false
  }

  ngOnDestroy(){
    this.chatService.currentChat.unsubscribe()
  }

}
