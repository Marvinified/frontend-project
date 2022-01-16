import './index.css';

import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import Button from 'src/components/Button';
import Messages from 'src/components/Messages';
import useChat from 'src/state/chat/useChat';

import SendMessage from '../SendMessage';

const Chat: React.FC = () => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const [isEnded, seIsEnded] = React.useState<boolean>(false);
  const {
    state: { chats },
    deleteSession,
    resetSession,
  } = useChat();
  const chat = chats[userId];

  const deleteChat = React.useCallback(() => {
    deleteSession(userId);
    history.push('/chats');
  }, [deleteSession, userId]);

  const resetChat = React.useCallback(() => {
    resetSession(userId);
  }, [resetSession, userId]);

  React.useEffect(() => {
    seIsEnded(chat?.messages ? chat.messages[chat.messages.length - 1].type === 'end' : false);
  }, [chat]);

  if (!chat) return <Redirect to="/chats" />;

  return (
    <div className="chat">
      <div className="header">
        <h4>{chat?.name}</h4>
        <Button style={{ backgroundColor: '#ff7373' }} onClick={deleteChat}>
          Delete Session
        </Button>
      </div>
      <Messages chat={chat} isEnded={isEnded} />
      {isEnded ? <Button onClick={resetChat}>Reset Session</Button> : <SendMessage loading={chat.loading} userId={userId} />}
    </div>
  );
};

export default Chat;
