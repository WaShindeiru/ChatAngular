import {ChatUser} from "./ChatUser";

export interface ChatMessage {
  id: number,
  messageText: string,
  sentDateTime: string,
  sentBy: ChatUser
}
