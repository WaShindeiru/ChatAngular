import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../http/ChatMessage";
import {HttpService} from "../http/http.service";
import {MessageComponent} from "../message/message.component";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-conversation-route',
  standalone: true,
  imports: [
    MessageComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './conversation-route.component.html',
  styleUrl: './conversation-route.component.css'
})
export class ConversationRouteComponent implements OnInit {

  private _messages: Array<ChatMessage>;
  private _conversationId: string;
  public messageForm: FormGroup;

  public constructor(private httpService: HttpService, private authenticationService: AuthenticationService,
                     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._conversationId = this.route.snapshot.params['id'];
    this.initialize();

    this.route.params.subscribe((params: Params) => {
      this._conversationId = params['id'];
    })

    this.messageForm = new FormGroup({
      'message': new FormControl()
    });
  }

  public async initialize() {

    let authenticated = await this.authenticationService.authenticate();

    if (authenticated) {
      this.httpService.getMessages(this._conversationId).subscribe(value => {
        this._messages = value;
      });
    }
  }

  public get messages() {
    return this._messages;
  }

  public get conversationId() {
    return this._conversationId;
  }

  public onMessageSend() : void {
    const message = this.messageForm.get("message").value;
    this.httpService.sendMessage(Number(this._conversationId), {
      messageText: message,
      sentDateTime: null,
      sentBy: this.authenticationService.user
    }).subscribe(value => );
  }
}
