import React from 'react';

import { initialState } from './reducer';
import { ChatContextType } from './types';

const ChatContext = React.createContext<ChatContextType>({
  state: initialState,
  addNewUser: () => null,
  sendMessage: () => null,
});

export default ChatContext;
