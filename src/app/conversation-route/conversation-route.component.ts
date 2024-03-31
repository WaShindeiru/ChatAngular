import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../http/ChatMessage";
import {HttpService} from "../http/http.service";
import {MessageComponent} from "../message/message.component";
import {NgClass, NgForOf} from "@angular/common";
import {AuthenticationService} from "../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";
import {Observable} from "rxjs";

@Component({
  selector: 'app-conversation-route',
  standalone: true,
  imports: [
    MessageComponent,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './conversation-route.component.html',
  styleUrl: './conversation-route.component.css'
  // providers: [WebsocketService]
})
export class ConversationRouteComponent implements OnInit {

  private _messages: Array<ChatMessage>;
  private _conversationId: string;
  public messageForm: FormGroup;
  public url: string = "localhost:8080";
  private websocket: WebSocketSubject<ChatMessage>;
  private chatMessageObservable: Observable<ChatMessage[]>;

  public constructor(private httpService: HttpService, public authenticationService: AuthenticationService,
                     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._conversationId = this.route.snapshot.params['id'];
    this.initialize();

    this.route.params.subscribe((params: Params) => {
      this._conversationId = params['id'];
      this.chatMessageObservable = this.httpService.getMessages(this._conversationId);
      this.chatMessageObservable.subscribe(value => {
        this._messages = value;
        this.sortMessages();
      });
    })

    this.messageForm = new FormGroup({
      'message': new FormControl()
    });
  }

  public async initialize() {

    let authenticated = await this.authenticationService.authenticate();

    if (authenticated) {
      this.chatMessageObservable = this.httpService.getMessages(this._conversationId);
      this.chatMessageObservable.subscribe(value => {
        this._messages = value;
      });

      this.websocket = webSocket<ChatMessage>("ws://" + this.url + "/ws/message" + "?access_token="
        + this.authenticationService.token);

      this.websocket.subscribe(value => {
        if(value.sentBy.userId !== this.authenticationService.user.userId && value.conversation.id == this._conversationId) {
          this._messages.push(value)
          this.sortMessages();
        }
      });
    }
  }

  public sortMessages(): void {
    this._messages.sort(this.dateComparator);
  }

  public dateComparator(message1: ChatMessage, message2: ChatMessage) {
    if(Date.parse(message1.sentDateTime) < Date.parse(message2.sentDateTime)) {
      return -1;
    } else {
      return 1;
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
      sentDateTime: Date.now().toString(),
      sentBy: this.authenticationService.user
    }).subscribe(value => this._messages.push(value));

    this.messageForm.setValue({message: ""});
  }
}
