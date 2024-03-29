import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {Conversation, ConversationWithoutId} from "./Conversation";
import {ChatMessage, ChatMessageWithoutId} from "./ChatMessage";
import {ChatUserPassword} from "./ChatUserPassword";
import {ChatUser} from "./ChatUser";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  public getConversations(): Observable<Array<Conversation>> {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authentication.token
    });

    let requestUrl = this.url + "/user/conversation";

    return this.http.get<Array<Conversation>>(requestUrl, {headers});
  }

  public getAllConversations() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authentication.token
    });

    let requestUrl = this.url + "/conversation";

    return this.http.get<Array<Conversation>>(requestUrl, {headers});
  }

  public getMessages(conversationId: string) {
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.authentication.token
    });

    let requestUrl = this.url + "/conversation/" + conversationId + "/message";

    return this.http.get<Array<ChatMessage>>(requestUrl, {headers});
  }

  public registerNewUser(user: ChatUserPassword) : Promise<Response> {
    const requestUrl = this.url + "/register";

    return fetch(requestUrl, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    });
  }

  public createNewConversation(conversation: ConversationWithoutId): Promise<Response>{
    const requestUrl = this.url + "/conversation";

    return fetch(requestUrl, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + this.authentication.token
      },
      body: JSON.stringify(conversation)
    });
  }

  public sendMessage(conversationId: number, message: ChatMessageWithoutId) {
    const requestUrl = this.url + "/conversation/" + conversationId + "/message";
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.authentication.token
    });

    return this.http.post<ChatMessage>(requestUrl, message, {headers});
  }

  public addUserToConversation(user: ChatUser, conversationId: string): Observable<Array<Conversation>> {
    const requestUrl = this.url + "/conversation/" + conversationId + "/user";
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.authentication.token
    });

    return this.http.post<Array<Conversation>>(requestUrl, user, {headers});
  }
}
