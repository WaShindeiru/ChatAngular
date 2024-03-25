import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {

  @Input() public conversationName: string = "";
  @Input() public lastMessage: string = "aha";
  @Input() public id: string = "";
  @Output() idEmitter = new EventEmitter<string>;

  public whenClicked() {
    this.idEmitter.emit(this.id);
  }
}
