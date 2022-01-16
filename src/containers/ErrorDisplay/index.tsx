import './index.css';

import React from 'react';
import useChat from 'src/state/chat/useChat';

const ErrorDisplay: React.FC = () => {
  const {
    state: { error },
  } = useChat();
  if (!error) return null;
  return <h5 className="error-message">{error}</h5>;
};

export default ErrorDisplay;
