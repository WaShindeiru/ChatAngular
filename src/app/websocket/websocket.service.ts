import { Injectable } from '@angular/core';
import {WebSocketMessage} from "./WebSocketMessage";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {AuthenticationService} from "../authentication/authentication.service";
import {filter, map, Observable, Subscription} from "rxjs";
import {User} from "../authentication/User";
import {webSocket} from "rxjs/webSocket";
import {ChatMessage} from "../http/ChatMessage";
import {Conversation} from "../http/Conversation";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private websocket: WebSocketSubject<WebSocketMessage>;

  private currentUserSubscription: Subscription;
  public currentUser: User;
  private url: string = "localhost:8080";

  constructor(public authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      value => {
        if (value !== null) {
          this.currentUser = value;
          this.websocket = webSocket<WebSocketMessage>("ws://" + this.url + "/ws/message" + "?access_token=" +
            this.currentUser.token);
          }
      }
    );
  }

  public getMessagesForConversation(conversationId: string) : Observable<ChatMessage> {

    return this.websocket.pipe(
      filter(value => value.message !== null),
      filter(value => value.message.sentBy.id !== this.currentUser.id &&
      value.message.conversation.id == conversationId),
      map(value => value.message)
    );
  }

  public getConversationNotification() : Observable<Conversation> {

    return this.websocket.pipe(
      filter(value => value.conversation !== null),
      map(value => value.conversation)
    );
  }
}
