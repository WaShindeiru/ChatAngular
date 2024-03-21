import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {ConversationComponent} from "../conversation/conversation.component";
import {HttpService} from "../http/http.service";
import {Conversation} from "../http/Conversation";
import {ChatMessage} from "../http/ChatMessage";
import {NgForOf} from "@angular/common";
import {MessageComponent} from "../message/message.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";

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
export class MainTemplateComponent implements OnInit {

  private _conversations : Array<Conversation>;

  constructor(private authenticationService: AuthenticationService, private httpService: HttpService,
              private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.initialize();
    }

  private async initialize() {
    const authenticated = await this.authenticationService.authenticate();

    if(!authenticated) {
      this.router.navigate(['login']);
    }

    this.httpService.getConversations().subscribe(value => this._conversations = value);
  }

  public get conversations() {
    return this._conversations;
  }

  public changeConversation(id : string) : void {
    this.router.navigate([id], {relativeTo: this.route})
  }
}
