import React from 'react';

import { ChatContextType } from '../../types';
import ChatContext from './context';

const useChat = (): ChatContextType => React.useContext(ChatContext);

export default useChat;
