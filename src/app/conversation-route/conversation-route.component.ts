import { Component } from '@angular/core';
import {ChatMessage} from "../http/ChatMessage";
import {HttpService} from "../http/http.service";
import {MessageComponent} from "../message/message.component";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-conversation-route',
  standalone: true,
  imports: [
    MessageComponent,
    NgForOf
  ],
  templateUrl: './conversation-route.component.html',
  styleUrl: './conversation-route.component.css'
})
export class ConversationRouteComponent {

  private _messages: Array<ChatMessage>;

  public constructor(private httpService: HttpService, private authenticationService: AuthenticationService) {
    this.initialize();
  }

  public async initialize() {

    let authenticated = await this.authenticationService.authenticate();

    if (authenticated) {
      this.httpService.getMessages(2).subscribe(value => {
        this._messages = value;
      });
    }
  }

  public get messages() {
    return this._messages;
  }
}
