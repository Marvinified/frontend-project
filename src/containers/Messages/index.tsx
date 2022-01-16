import React from 'react';
import { ChatType } from 'src/types';

import AudioHandler from '../AudioHandler';

type MessagesProps = {
  chat: ChatType;
  isEnded: boolean;
  id: string;
};

const Messages: React.FC<MessagesProps> = ({ id, chat, isEnded }) => {
  const { messages = [], loading = false } = chat || {};
  const messageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = messageRef.current;
    if (node && messages) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageRef} className="messages">
      <AudioHandler messages={messages} id={id} />
      {messages?.map((message, index) => {
        if (message.isInfo)
          return (
            <span key={index} className="info">
              {message?.text}
            </span>
          );

        if (message.type === 'end') {
          // setIsEnded(true);
          return (
            <span key={index} className="info">
              Session has ended
            </span>
          );
        }

        if (['speak', 'text'].includes(message.type))
          return (
            <div key={index} className={`message ${message.direction}-message`}>
              {message?.text}
            </div>
          );
        return null;
      })}
      {loading && !isEnded && <div className="message incoming-message">Loading...</div>}
    </div>
  );
};

export default Messages;
