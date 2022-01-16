import './index.css';

import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Chat from '../../components/Chat';
import Empty from '../../components/Empty';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="chats-list">
        <Link to="/chats/john" className="item">
          <div className="avatar">J</div>
          <div className="details">
            <h5>John Doe</h5>
            <span className="last-messge">You: I want pizza</span>
          </div>
        </Link>
        <Link to="/chats/jane" className="item">
          <div className="avatar">J</div>
          <div className="details">
            <h5>Jane Doe</h5>
            <span className="last-messge">Bot: Let's send money</span>
          </div>
        </Link>
      </div>

      <div className="chats-messages">
        <Switch>
          <Route path="/chats/:id" component={Chat} />
          <Route component={Empty} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
