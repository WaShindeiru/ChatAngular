import { Component } from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {ConversationComponent} from "../conversation/conversation.component";
import {HttpService} from "../http/http.service";
import {Conversation} from "../http/Conversation";
import {ChatMessage} from "../http/ChatMessage";
import {NgForOf} from "@angular/common";
import {MessageComponent} from "../message/message.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-template',
  standalone: true,
  imports: [
    ConversationComponent,
    NgForOf,
    MessageComponent,
    RouterOutlet
  ],
  templateUrl: './main-template.component.html',
  styleUrl: './main-template.component.css'
})
export class MainTemplateComponent {

  private _conversations : Array<Conversation>;

  constructor(private authenticationService: AuthenticationService, private httpService: HttpService) {
    this.initialize();
  }

  private async initialize() {
    this.authenticationService.username = "Fvlte";
    this.authenticationService.password = "123";
    await this.authenticationService.authenticate();

    this.httpService.getConversations().subscribe(value => this._conversations = value);
  }

  public get conversations() {
    return this._conversations;
  }

  public showId(id : string) : void {
    console.log(id);
  }
}
