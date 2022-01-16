export enum MessageDirection {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  INFO = 'INFO',
}

export type MessageType = {
  text: string;
  src?: string;
  type: string;
  isInfo?: boolean;
  direction: MessageDirection;
};

export type ChatType = {
  id: string;
  loading?: boolean;
  name?: string;
  messages?: Array<MessageType>;
};

export type ChatsType = Record<string, ChatType>;

export type ChatsStateType = {
  chats: ChatsType;
  error: string;
};

export type PayloadType = {
  id: string;
  loading?: boolean;
  name?: string;
  messages?: Array<MessageType>;
  message?: MessageType;
  chats?: ChatsStateType;
  error?: string;
};

export type Action = {
  type: string;
  payload: PayloadType;
};

export type ChatContextType = {
  state: ChatsStateType;
  addNewUser: (username: string) => void;
  sendMessage: (userId: string, message: string) => void;
  resetSession: (userId: string) => void;
  deleteSession: (userId: string) => void;
};

export type DispatchFunction = (dispatch: React.Dispatch<Action>) => (...arg: string[]) => unknown;
