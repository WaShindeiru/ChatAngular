import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-conversation-search',
  standalone: true,
  imports: [],
  templateUrl: './conversation-search.component.html',
  styleUrl: './conversation-search.component.css'
})
export class ConversationSearchComponent {

  @Input() public conversationId: string = "";
  @Input() public conversationName: string = "";
  @Output() idEmitter = new EventEmitter<string>;

  public whenClicked() {
    this.idEmitter.emit(this.conversationId);
  }
}
