import './index.css';

import React from 'react';
import { Redirect, useParams } from 'react-router';
import Button from 'src/components/Button';
import Messages from 'src/components/Messages';
import useChat from 'src/state/chat/useChat';

import SendMessage from '../SendMessage';

const Chat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isEnded, seIsEnded] = React.useState<boolean>(false);
  const { state } = useChat();
  const chat = state[userId];

  React.useEffect(() => {
    seIsEnded(chat?.messages ? chat.messages[chat.messages.length - 1].type === 'end' : false);
  }, [chat]);

  if (!chat) return <Redirect to="/chats" />;

  return (
    <div className="chat">
      <div className="header">
        <h4>{chat?.name}</h4>
        <Button onClick={() => seIsEnded(true)}>End session</Button>
      </div>
      <Messages chat={chat} isEnded={isEnded} />
      {isEnded ? <Button>Reset Session</Button> : <SendMessage userId={userId} />}
    </div>
  );
};

export default Chat;
