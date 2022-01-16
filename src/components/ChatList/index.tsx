import './index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { ChatListItem } from 'src/state/chat/types';

import Empty from '../Empty';

type ChatListProps = {
  chats: ChatListItem[];
  userId: string;
};

const ChatList: React.FC<ChatListProps> = ({ chats, userId }) => {
  return (
    <div className="chats-list">
      {chats.length ? (
        chats.map(({ id, lastMessage, name }) => (
          <Link key={id} to={`/chats/${id}`} className={userId === id ? 'item active' : 'item'}>
            <div className="avatar">{(name && name[0]) || ''}</div>
            <div className="details">
              <h5>{name}</h5>
              <span className="last-messge">{lastMessage?.text || 'Open chat to view '}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="item">
          <Empty>No chats yet, add a user to get started!</Empty>
        </div>
      )}
      {}
    </div>
  );
};

export default ChatList;
