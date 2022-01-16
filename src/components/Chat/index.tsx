import './index.css';

import React from 'react';

import Button from '../Button';
import Input from '../Input';

const Chat: React.FC = () => (
  <div className="chat">
    <div className="header">
      <h4>John Doe</h4>
    </div>
    <div className="messages">
      <span className="info">Chat initiated</span>
      <div className="message incoming-message">Lorem ipsum</div>
      <div className="message outgoing-message">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium repellat aperiam enim voluptatem voluptatibus perspiciatis dolor saepe
        minima suscipit autem, non accusamus eos eaque quisquam? Mollitia omnis facilis nostrum inventore.
      </div>
    </div>
    <div className="input-container">
      <Input placeholder="Enter a response..." />
      <Button>Send</Button>
    </div>
  </div>
);

export default Chat;
