import React from 'react';

import { ChatContextType } from '../../types';
import { initialState } from './reducer';

const ChatContext = React.createContext<ChatContextType>({
  state: initialState,
  addNewUser: () => null,
  sendMessage: () => null,
  resetSession: () => null,
  deleteSession: () => null,
});

export default ChatContext;
