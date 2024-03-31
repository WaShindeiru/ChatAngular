import {Component, Input} from '@angular/core';
import { ChatUser } from '../http/ChatUser';
import {ChatMessage} from "../http/ChatMessage";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message: ChatMessage;
  @Input() messageType: string;
}
