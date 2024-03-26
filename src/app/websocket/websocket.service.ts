import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {ChatMessage, ChatMessageWithoutId} from "../http/ChatMessage";
import {AuthenticationService} from "../authentication/authentication.service";
import {webSocket} from "rxjs/webSocket";

@Injectable({providedIn: "root"})
export class WebsocketService {

  private websocket : WebSocketSubject<ChatMessage>;
  private url: string = "ws://localhost:8080/ws/message";
  public count: number = 0;

  constructor(private authenticationService: AuthenticationService) {

    this.initialize();
  }

  public async initialize() {
    let authenticated = await this.authenticationService.authenticate();

    if (authenticated) {
      this.websocket = webSocket<ChatMessage>(this.url + "?access_token=" + this.authenticationService.token);
    }
  }
}
