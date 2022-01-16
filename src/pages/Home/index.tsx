import './index.css';

import React from 'react';
import { useParams } from 'react-router';
import ChatList from 'src/components/ChatList';
import { ChatListItem } from 'src/state/chat/types';
import useChat from 'src/state/chat/useChat';

const Home: React.FC = () => {
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

export default Home;
