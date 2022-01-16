import './index.css';

import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`button ${props.className}`}>
    {children}
  </button>
);

export default Button;
