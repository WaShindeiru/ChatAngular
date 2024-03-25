import {ChatUser} from "./ChatUser";
import {Conversation} from "./Conversation";

export interface ChatMessage {
  id: number,
  messageText: string,
  sentDateTime: string,
  sentBy: ChatUser,
  conversation: Conversation
}

export interface ChatMessageWithoutId {
  messageText: string,
  sentDateTime: string,
  sentBy: ChatUser
}
