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
import {forkJoin} from "rxjs";

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

  private myConversations : Array<Conversation>;
  public myConversationsSet: Set<string>;
  public conversationsAll: Array<Conversation>;
  public conversationsNotPresentIn: Array<Conversation>;
  public conversationsNotPresentInSet: Set<string>;
  public conversationsRegular: Array<Conversation>;
  public conversationsRegularSet: Set<string>;

  public searchInputFocus: boolean = false;
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

    forkJoin(
      {
        "myConversations": this.httpService.getConversations(),
        "allConversations": this.httpService.getAllConversations()
      }
    ).subscribe(value =>
    {
      this.myConversations = value["myConversations"];
      this.myConversationsSet = new Set<string>();
      this.conversationsAll = value["allConversations"];
      this.conversationsNotPresentIn = new Array<Conversation>();
      this.conversationsNotPresentInSet = new Set<string>();

      this.myConversations.forEach(conversation => {
        this.myConversationsSet.add(conversation.id);
      });

      this.conversationsAll.forEach(conversation => {
        if(!this.myConversationsSet.has(conversation.id)) {
          this.conversationsNotPresentIn.push(conversation);
          this.conversationsNotPresentInSet.add(conversation.id);
        }
      });

      this.populateSearch();
    });
  }

  public get conversations() {
    return this.myConversations;
  }

  public changeConversation(id : string) : void {
    this.router.navigate([id], {relativeTo: this.route})
  }

  public addUserToConversation(id: string): void {
    this.httpService.addUserToConversation(this.authenticationService.user, id).subscribe(
      value => this.myConversations = value);
  }

  public showSearchInput(event: Event) : void {
    this.searchInputFocus = true;
    event.stopPropagation();
  }

  private populateSearch() : void {
    this.conversationsRegular = new Array<Conversation>();
    this.conversationsRegularSet = new Set<string>();

    let randomInt = Math.floor(Math.random() * this.conversationsNotPresentIn.length);
    let tempConversation = this.conversationsNotPresentIn.at(randomInt);

    for(let i = 0; i < this.conversationNumber && i < this.conversationsNotPresentIn.length; i++) {

      while(this.conversationsRegularSet.has(tempConversation.id)) {
        randomInt = Math.floor(Math.random() * this.conversationsNotPresentIn.length)
        tempConversation = this.conversationsNotPresentIn.at(randomInt);
      }

      this.conversationsRegular.push(tempConversation);
      this.conversationsRegularSet.add(tempConversation.id);
    }
  }

  public updateSearch(event: Event) : void {
    const search: string = this.searchInput.value;

    if(search === "") {
      this.populateSearch();

    } else {
      this.conversationsRegular = new Array<Conversation>();
      const myRe = new RegExp(search);

      for (const conversation of this.conversationsNotPresentIn) {
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

  public goToConversationCreation() {
    this.router.navigate(["create"]);
  }

  public onSignOut(): void {
    this.authenticationService.signOut();
    this.router.navigate(['login']);
  }
}
