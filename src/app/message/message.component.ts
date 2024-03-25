import {Component, Input} from '@angular/core';
import { ChatUser } from '../http/ChatUser';
import {ChatMessage} from "../http/ChatMessage";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message: ChatMessage;
}
