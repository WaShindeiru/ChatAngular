import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {Conversation, ConversationWithoutId} from "./Conversation";
import {ChatMessage, ChatMessageWithoutId} from "./ChatMessage";
import {ChatUser} from "./ChatUser";
import {Observable, Subscription} from "rxjs";
import {User} from "../authentication/User";

@Injectable({
  providedIn: 'root'
})
export class HttpService  {

  private url: string = "http://localhost:8080";
  private currentUserSubscription: Subscription;
  private currentUser: User;

  constructor(private http: HttpClient, private authentication: AuthenticationService) {
    this.currentUserSubscription = this.authentication.currentUser.subscribe(value => this.currentUser = value);
  }

  public getConversations(): Observable<Array<Conversation>> {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.currentUser.token
    });

    let requestUrl = this.url + "/user/conversation";

    return this.http.get<Array<Conversation>>(requestUrl, {headers});
  }

  public getAllConversations() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.currentUser.token
    });

    let requestUrl = this.url + "/conversation";

    return this.http.get<Array<Conversation>>(requestUrl, {headers});
  }

  public getMessages(conversationId: string) {
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.currentUser.token
    });

    let requestUrl = this.url + "/conversation/" + conversationId + "/message";

    return this.http.get<Array<ChatMessage>>(requestUrl, {headers});
  }

  public createNewConversation(conversation: ConversationWithoutId): Promise<Response>{
    const requestUrl = this.url + "/conversation";

    return fetch(requestUrl, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + this.currentUser.token
      },
      body: JSON.stringify(conversation)
    });
  }

  public sendMessage(conversationId: number, message: ChatMessageWithoutId) {
    const requestUrl = this.url + "/conversation/" + conversationId + "/message";
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.currentUser.token
    });

    return this.http.post<ChatMessage>(requestUrl, message, {headers});
  }

  public addUserToConversation(user: User, conversationId: string): Observable<Array<Conversation>> {
    const requestUser: ChatUser = User.toChatUser(user);

    const requestUrl = this.url + "/conversation/" + conversationId + "/user";
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.currentUser.token
    });

    return this.http.post<Array<Conversation>>(requestUrl, requestUser, {headers});
  }
}
