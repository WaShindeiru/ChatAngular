import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {

  @Input() public conversationName: string = "";
  @Input() public lastMessage: string = "";
  @Input() public id: string = "";
  @Input() public currentConversation: string = null;
  @Output() idEmitter = new EventEmitter<string>;

  public whenClicked() {
    this.idEmitter.emit(this.id);
  }
}
