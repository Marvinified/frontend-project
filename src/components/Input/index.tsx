import './index.css';

import React from 'react';

export type InputProps = {
  placeholder?: string;
};

const Input: React.FC<InputProps> = (props) => <input {...props} />;

export default Input;
