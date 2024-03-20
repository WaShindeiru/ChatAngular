import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {Conversation} from "./Conversation";
import {ChatMessage} from "./ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  public getConversations() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authentication.token
    });

    let requestUrl = this.url + "/conversation";

    return this.http.get<Array<Conversation>>(requestUrl, {headers});
  }

  public getMessages(conversationId: number) {
    let headers = new HttpHeaders( {
      Authorization: "Bearer " + this.authentication.token
    });

    let requestUrl = this.url + "/conversation/" + conversationId + "/message";

    return this.http.get<Array<ChatMessage>>(requestUrl, {headers});
  }

}
