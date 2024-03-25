import { Injectable } from '@angular/core';
import {RxStomp} from "@stomp/rx-stomp";
import {SimpleMessage} from "./SimpleMessage";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceOld {

  private client: RxStomp;
  public count: number = 0;

  constructor(private authentication: AuthenticationService) {
    this.initalize();
  }

  private async initalize() {
    await this.authentication.waitUntilAuthenticated();

    const stompConfig = {
      brokerURL: "ws://localhost:8080/ws/?access_token=" + this.authentication.token,
      reconnectDelay: 200,

    }

    this.client = new RxStomp();
    this.client.configure(stompConfig);
    this.client.activate();

    // @ts-ignore
    const subscription1 = this.client
      .watch({destination: "/queue/news"})
      .subscribe((message) => console.log("Received: " + message.body));
  }

  public getExampleMessage(messageRecipient: string): SimpleMessage {
    return {
      message: "test",
      recipient: messageRecipient,
      author: "me",
      count: this.count
    }
  }

  public sendMessage(): void {
    this.count++;
    this.client.publish({
      destination: "/app/news",
      body: JSON.stringify(this.getExampleMessage("Igor"))
    });
  }
}
