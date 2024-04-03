export interface ChatUser {
  id: string,
  username: string,
  status: string
}

export interface ChatUserPassword {
  id?: string,
  username: string,
  password: string
}
