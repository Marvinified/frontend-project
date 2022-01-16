import './index.css';

import React from 'react';

import Button from '../Button';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>VoiceBot</h2>
      <Button>Add New User</Button>
    </nav>
  );
};

export default Navbar;
