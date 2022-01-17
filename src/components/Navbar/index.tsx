import './index.css';

import React from 'react';
import AddNewUser from 'src/containers/AddNewUser';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>Pizza Bot</h2>
      <AddNewUser />
    </nav>
  );
};

export default Navbar;
