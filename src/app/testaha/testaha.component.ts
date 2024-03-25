import { Component } from '@angular/core';
import {WebsocketServiceOld} from "../websocketOld/websocket.serviceOld";

@Component({
  selector: 'app-testaha',
  standalone: true,
  imports: [],
  templateUrl: './testaha.component.html',
  styleUrl: './testaha.component.css'
})
export class TestahaComponent {

  constructor(private websocket: WebsocketServiceOld) {}

  public sendMessage() : void {
    this.websocket.sendMessage();
  }
}
