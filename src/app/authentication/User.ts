import {ChatUser} from "../http/ChatUser";

export class User {

  constructor(
    public id: string,
    public username: string,
    public token: string
  ) {}

  public static toChatUser(user: User): ChatUser {
    return {
      id: user.id,
      username: user.username,
      status: "ONLINE"
    };
  }
}

export interface AuthenticationResponse {

  id: string,
  username: string,
  token: string,
  status?: string
}
