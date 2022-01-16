import React from 'react';

const Empty: React.FC = ({ children }) => <h6> {children || 'Please select a user to view chat'}</h6>;

export default Empty;
