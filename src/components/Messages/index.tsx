import './index.css';

import React from 'react';
import { ChatType } from 'src/state/chat/types';

type MessagesProps = {
  chat: ChatType;
  isEnded: boolean;
};

const Messages: React.FC<MessagesProps> = ({ chat, isEnded }) => {
  const messageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = messageRef.current;
    if (node && chat?.messages) {
      node.scrollTop = node.scrollHeight;
    }
  }, [chat]);

  return (
    <div ref={messageRef} className="messages">
      {chat?.messages?.map((message, index) => {
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
      {chat.loading && !isEnded && <div className="message incoming-message">Loading...</div>}
    </div>
  );
};

export default Messages;
