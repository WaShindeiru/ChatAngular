import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {ConversationComponent} from "../conversation/conversation.component";
import {HttpService} from "../http/http.service";
import {Conversation} from "../http/Conversation";
import {ChatMessage} from "../http/ChatMessage";
import {NgForOf, NgIf} from "@angular/common";
import {MessageComponent} from "../message/message.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ConversationSearchComponent} from "../conversation-search/conversation-search.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-main-template',
  standalone: true,
  imports: [
    ConversationComponent,
    NgForOf,
    MessageComponent,
    RouterOutlet,
    NgIf,
    ConversationSearchComponent,
    ReactiveFormsModule
  ],
  templateUrl: './main-template.component.html',
  styleUrl: './main-template.component.css'
})
export class MainTemplateComponent implements OnInit {

  private _conversations : Array<Conversation>;
  public searchInputFocus: boolean = false;
  public conversationsAll: Array<Conversation>;
  public conversationsRegular: Array<Conversation>;
  private conversationNumber: number = 4;
  public searchInput: FormControl;

  constructor(private authenticationService: AuthenticationService, private httpService: HttpService,
              private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.initialize();
    }

  private async initialize() {
    this.searchInput = new FormControl<string>("");
    const authenticated = await this.authenticationService.authenticate();

    if(!authenticated) {
      this.router.navigate(['login']);
    }

    this.httpService.getConversations().subscribe(value => this._conversations = value);
    this.httpService.getAllConversations().subscribe(value => {
      this.conversationsAll = value;
      this.populateSearch();
    });
  }

  public get conversations() {
    return this._conversations;
  }

  public changeConversation(id : string) : void {
    this.router.navigate([id], {relativeTo: this.route})
  }

  public addUserToConversation(id: string): void {
    this.httpService.addUserToConversation(this.authenticationService.user, id).subscribe(
      value => this._conversations = value);
  }

  public showSearchInput(event: Event) : void {
    this.searchInputFocus = true;
    event.stopPropagation();
  }

  private populateSearch() : void {
    this.conversationsRegular = new Array<Conversation>();
    let randomIntSet = new Set<number>();
    let randomInt = Math.floor(Math.random() * this.conversationsAll.length);

    for(let i = 0; i < this.conversationNumber && i < this.conversationsAll.length; i++) {

      while(randomIntSet.has(randomInt)) {
        randomInt = Math.floor(Math.random() * this.conversationsAll.length);
      }

      randomIntSet.add(randomInt);
      this.conversationsRegular.push(this.conversationsAll.at(randomInt));
    }
  }

  public updateSearch(event: Event) : void {
    const search: string = this.searchInput.value;

    if(search === "") {
      this.populateSearch();

    } else {
      this.conversationsRegular = new Array<Conversation>();
      const myRe = new RegExp(search);

      for (const conversation of this.conversationsAll) {
        const temp = myRe.exec(conversation.conversationName);
        if (temp !== null) {
          this.conversationsRegular.push(conversation);
        }
      }
    }
  }

  public showEvent(event: Event) : void {
    this.searchInputFocus = false;
  }
}
