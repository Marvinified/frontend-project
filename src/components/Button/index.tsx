import './index.css';

import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className="button">
    {children}
  </button>
);

export default Button;
