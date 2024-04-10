import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from "../http/ChatMessage";
import {HttpService} from "../http/http.service";
import {MessageComponent} from "../message/message.component";
import {NgClass, NgForOf} from "@angular/common";
import {AuthenticationService} from "../authentication/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";
import {Observable, Subscription} from "rxjs";
import {User} from "../authentication/User";
import {WebSocketMessage} from "../websocket/WebSocketMessage";
import {WebsocketService} from "../websocket/websocket.service";

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
export class ConversationRouteComponent implements OnInit, OnDestroy {

  private _messages: Array<ChatMessage>;
  private _conversationId: string;
  public messageForm: FormGroup;
  private url: string = "localhost:8080";
  private subscription: Subscription;
  private chatMessageObservable: Observable<ChatMessage[]>;

  private currentUserSubscription: Subscription;
  public currentUser: User;

  public constructor(private httpService: HttpService, public authenticationService: AuthenticationService,
                     private route: ActivatedRoute, private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      value => this.currentUser = value);

    this._conversationId = this.route.snapshot.params['id'];

    this.chatMessageObservable = this.httpService.getMessages(this._conversationId);
    this.chatMessageObservable.subscribe(value => {
      this._messages = value;
      this.sortMessages();
    });

    this.subscription = this.websocketService.getMessagesForConversation(this._conversationId).subscribe(
      value => this._messages.push(value)
    );

    this.route.params.subscribe((params: Params) => {
      this._conversationId = params['id'];
      this.chatMessageObservable = this.httpService.getMessages(this._conversationId);
      this.chatMessageObservable.subscribe(value => {
        this._messages = value;
        this.sortMessages();
      });

      this.subscription.unsubscribe();

      this.subscription = this.websocketService.getMessagesForConversation(this._conversationId).subscribe(
        value => this._messages.push(value)
      );
    })

    this.messageForm = new FormGroup({
      'message': new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
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
      sentDateTime: new Date().toISOString(),
      sentBy: User.toChatUser(this.currentUser)
    }).subscribe(value => this._messages.push(value));

    this.messageForm.setValue({message: ""});
  }
}
