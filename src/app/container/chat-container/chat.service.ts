import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Chat } from './chat-list/chat.model'
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatUser, User } from 'src/app/auth/user.model';
import { Message } from './chat-message/chat-message.component';
import { environment } from '../../../environments/environment'

@Injectable()
export class ChatService{
    currentChat: BehaviorSubject<Chat> = new BehaviorSubject<Chat>(null);
    newChatOrderObs: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient){}

    onOpenChat(chat: Chat){
        this.currentChat.next(chat)
    }

    getUserChats(){
        return this.http
        .get<Chat[]>(environment.backendUrl + '/chat/chats')
    }

    getChatMessages(chat_id: string){
        return this.http
        .get<Message[]>
        (environment.backendUrl + '/chat/messages', {
            params:{
                chat_id: chat_id 
            }
        })
    }

    onAddChat(user_id: string){
        return this.http
        .post<Chat>(environment.backendUrl + '/chat/add', {
            user_id:user_id
        })
    }

    onGetUsers(suggestion: string){
        return this.http
        .get<ChatUser[]>(environment.backendUrl + '/chat/users',{
            params:{
                suggestion: suggestion
            }
        })
    }
}