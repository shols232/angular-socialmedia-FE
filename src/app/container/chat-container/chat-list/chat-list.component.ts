import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatUser, User } from 'src/app/auth/user.model';
import { ChatService } from '../chat.service';
import { Chat } from './chat.model'


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  user: User;
  error_msg = ''
  alert_box_opened = false
  users : ChatUser[] = [];
  image_base_url = 'http://127.0.0.1:8000'
  chats: Chat[] = [];

  constructor(
    private userService: AuthService, 
    private chatService: ChatService,
    ) { }

  ngOnInit(): void {
    this.user = this.userService.user.getValue()
    this.chatService.getUserChats().subscribe(data => {
      console.log(data)
      this.chats.push(...data)
    })
    this.chatService.newChatOrderObs.subscribe(id => {
      this.chats.forEach((chat, index) => {
        if(chat.id == id){
          this.chats.splice(index, 1)
          this.chats.unshift(chat)
        }
      })
    })
  }

  onOpenChat(chat: Chat){
    this.chatService.onOpenChat(chat)
    
  }

  onAddChat(user_id: string){
    this.chatService.onAddChat(user_id).subscribe(data => {
      console.log(data)
      try {
        if(data['status'] == 'ACTION_CANNOT_BE_PERFORMED'){
          this.error_msg = `Sorry! but the settings configuration of this user only 
          allows messages from people they follow`
          return
        } 
      } catch (error) {
        console.log(error)
      }
      const currChat = this.chatService.currentChat.getValue()
      this.onOpenChat(data)
      if(currChat != this.chatService.currentChat.getValue()){
        this.chats.unshift(this.chatService.currentChat.getValue())
      }
    })
  }

  fetchUsers(sugg: string=''){
    if (sugg.length > 2 || this.users.length == 0){
      this.chatService.onGetUsers(sugg).subscribe(data => {
        this.users.push(...data)
        console.log(data)
      })
    }
  }

  toggleAlert(){
    this.alert_box_opened = !this.alert_box_opened
  }

}
