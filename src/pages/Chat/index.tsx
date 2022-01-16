import './index.css';

import React from 'react';
import { useHistory, useParams } from 'react-router';
import Button from 'src/components/Button';
import Empty from 'src/components/Empty';
import Messages from 'src/containers/Messages';
import useChat from 'src/state/chat/useChat';

import SendMessage from '../../containers/SendMessage';

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
    seIsEnded(chat?.messages ? chat?.messages[chat?.messages.length - 1].type === 'end' : false);
  }, [chat]);

  return (
    <div className="chats-messages">
      <div className="chat">
        <div className="header">
          <Button className="back-btn" onClick={() => history.push('/chats')}>
            Back
          </Button>
          <h4> {chat?.name}</h4>
          <Button className="delete-btn" onClick={deleteChat}>
            Delete Session
          </Button>
        </div>
        {!chat ? (
          <Empty>No chat found</Empty>
        ) : (
          <>
            <Messages id={userId} chat={chat} isEnded={isEnded} />
            {isEnded ? <Button onClick={resetChat}>Reset Session</Button> : <SendMessage loading={chat?.loading} userId={userId} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
