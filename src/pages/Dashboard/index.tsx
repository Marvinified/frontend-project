import './index.css';

import React from 'react';
import { useParams } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import useChat from 'src/state/chat/useChat';

import Empty from '../../components/Empty';
import Chat from '../../containers/Chat';

const Dashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { chats: chatsState = {} },
  } = useChat();

  const chats = Object.keys(chatsState).map((id) => {
    const chat = chatsState[id] || { messages: [] };
    return {
      id,
      name: chat.name,
      lastMessage: chat.messages && chat.messages[chat?.messages.length - 1],
    };
  });

  return (
    <div className="dashboard">
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
      </div>

      <div className="chats-messages">
        <Switch>
          <Route path="/chats/:userId" component={Chat} />
          <Route component={Empty} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;