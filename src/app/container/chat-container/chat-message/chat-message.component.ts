import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service'
import ReconnectingWebSocket from 'reconnecting-websocket';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { Chat } from '../chat-list/chat.model';

export interface Message{
    sender_username:string, 
    content: string, 
    timestamp: string
}

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {
  user: User
  messages: Message[] = [];
  users = []
  rcWebsocket: ReconnectingWebSocket;
  @Input() chat: Chat; 
  @ViewChildren('messages') messagesEl: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  msgContent: string = ''

  baseWSocketUrl = '127.0.0.1:8000'
  baseImgUrl = 'http://127.0.0.1:8000'

  constructor(
    private userService: AuthService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private renderer: Renderer2
    ) {}

  ngOnInit(): void {
    this.user = this.userService.user.getValue()
    this.rcWebsocket = new ReconnectingWebSocket(
      this.getProtocol() + this.baseWSocketUrl +
      '/ws/chat/' + this.chat.id + '/' + '?token='+ this.user.token
      );
    this.chatService.currentChat.subscribe(chat => {
      this.chat = chat
      this.fetchMessages()
    })
    console.log((this.user.profile_picture))
    this.onReceiveMessage()
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagesEl.changes.subscribe(this.scrollToBottom);
  }

  getProtocol(){
    let wsStart = "ws://"
    if (window.location.protocol == "https:"){
        wsStart = "wss://"
    }
    return wsStart
  }

  onReceiveMessage(){
    this.rcWebsocket.addEventListener('message', (msgEvent) => {
      let data = JSON.parse(msgEvent.data)
      if(data.command == 'messages'){
        // do something
        if(data['status'] === 'Chat with that id does not exist'){
          // redirect away
        }else{
          console.log(data.messages)
        }
      } else if (data['command'] === 'new_message'){
        const message = <Message>data['message']
        this.messages.push(message)
        this.chatService.newChatOrderObs.next(this.chat.id)
        this.chat.last_message_sent.content = message.content
        this.chat.last_message_sent.sender_username = message.sender_username
      }
    })
  }

  onSendMessage(content: string, e:HTMLElement){
    this.rcWebsocket.send(JSON.stringify({
          'command': 'new_message',
          'message': content,
          'chat_id':this.chat.id
      }))
      e.innerHTML = ''
      e.innerHTML.trim()
  }

  fetchMessages(){
    this.chatService.getChatMessages(this.chat.id).subscribe(data => {
      this.messages = data
    })
  }

  scrollToBottom = () => {
    console.log('aliu')
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
