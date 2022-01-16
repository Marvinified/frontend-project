import './index.css';

import React from 'react';
import useChat from 'src/state/chat/useChat';

import Button from '../../components/Button';
import Input from '../../components/Input';

type SendMessageProps = {
  userId: string;
  loading?: boolean;
};
const SendMessage: React.FC<SendMessageProps> = ({ userId, loading }) => {
  const [message, setMessage] = React.useState('');
  const { sendMessage } = useChat();

  const handleOnSubmit = React.useCallback(async () => {
    if (userId && message && !loading) {
      // eslint-disable-next-line no-console
      console.log('sendMessage', userId, message);
      await sendMessage(userId, message);
      setMessage('');
    }
  }, [message]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  return (
    <div className="input-container">
      <Input value={message} onChange={handleOnChange} placeholder="Enter a response..." />
      <Button onClick={handleOnSubmit}>Send</Button>
    </div>
  );
};

export default SendMessage;
