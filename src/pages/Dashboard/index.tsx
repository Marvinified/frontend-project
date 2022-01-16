import './index.css';

import React from 'react';
import { useParams } from 'react-router';
// import { Route, Switch } from 'react-router-dom';
import ChatList from 'src/components/ChatList';
import { ChatListItem } from 'src/state/chat/types';
import useChat from 'src/state/chat/useChat';

// import Empty from '../../components/Empty';
// import Chat from '../../containers/Chat';

const Dashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { chats: chatsState = {} },
  } = useChat();

  const chats: ChatListItem[] = Object.keys(chatsState).map((id) => {
    const chat = chatsState[id] || { messages: [] };
    return {
      id,
      name: chat.name,
      lastMessage: chat.messages && chat.messages[chat?.messages.length - 1],
    };
  });

  return <ChatList chats={chats} userId={userId} />;
};

export default Dashboard;
