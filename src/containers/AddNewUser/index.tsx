import './index.css';

import React from 'react';
import useChat from 'src/state/chat/useChat';

import Button from '../../components/Button';
import Input from '../../components/Input';

const AddNewUser: React.FC = () => {
  const [name, setName] = React.useState('');
  const { addNewUser } = useChat();

  const handleOnSubmit = React.useCallback(async () => {
    await addNewUser(name);
    setName('');
  }, [name, addNewUser]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  return (
    <div className="new-user">
      <Input placeholder="Enter User Name" value={name} onChange={handleOnChange} />
      <Button onClick={handleOnSubmit}>Add New User</Button>
    </div>
  );
};

export default AddNewUser;
