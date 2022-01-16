import * as React from 'react';
import { useHistory } from 'react-router-dom';

import actions from './actions';
import ChatContext from './context';
import reducer, { initialState } from './reducer';
import { Action, ChatContextType, ChatsStateType } from './types';

type ReducerType = (state: ChatsStateType, action: Action) => ChatsStateType;
const cache = (fun: ReducerType) => (state: ChatsStateType, action: Action) => {
  const cachable = fun(state, action);
  JSON.stringify(cachable);
  localStorage.setItem('chats', JSON.stringify(cachable));
  return cachable;
};

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(cache(reducer), initialState);
  const history = useHistory();

  React.useEffect(() => {
    const chats: ChatsStateType = JSON.parse(localStorage.getItem('chats') || '{}');
    if (chats) {
      // eslint-disable-next-line no-console
      console.log('chats', chats);
      dispatch({
        type: 'INIT',
        payload: { id: 'all', chats },
      });
    }
  }, []);

  const value: ChatContextType = React.useMemo(
    () => ({
      state,
      addNewUser: actions.addNewUser(dispatch, history),
      sendMessage: actions.sendMessage(dispatch),
    }),
    [state, dispatch, history]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
