import React from 'react';

import ChatContext from './context';
import { ChatContextType } from './types';

const useChat = (): ChatContextType => React.useContext(ChatContext);

export default useChat;
