import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private websocket : WebSocketSubject<any>;

  constructor() { }
}
