import {ChatMessage} from "../http/ChatMessage";
import {Conversation} from "../http/Conversation";

export interface WebSocketMessage {

  message: ChatMessage;
  conversation: Conversation;
}
