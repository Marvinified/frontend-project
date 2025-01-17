import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Action, ChatContextType, ChatsStateType, ChatsType } from '../../types';
import actions from './actions';
import ChatContext from './context';
import reducer, { initialState } from './reducer';

type ReducerType = (state: ChatsStateType, action: Action) => ChatsStateType;
const cache = (fun: ReducerType) => (state: ChatsStateType, action: Action) => {
  const cachable = fun(state, action);
  localStorage.setItem('chats', JSON.stringify(cachable.chats));
  return cachable;
};

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(cache(reducer), initialState);
  const history = useHistory();

  React.useEffect(() => {
    const cache = localStorage.getItem('chats');
    if (cache) {
      const chats: ChatsType = JSON.parse(cache);
      if (chats) {
        dispatch({
          type: 'INIT',
          payload: { id: 'all', chats },
        });
      }
    }
  }, []);

  const value: ChatContextType = React.useMemo(
    () => ({
      state,
      addNewUser: actions.addNewUser(dispatch, history),
      sendMessage: actions.sendMessage(dispatch),
      deleteSession: actions.deleteSession(dispatch),
      resetSession: actions.resetSession(dispatch),
    }),
    [state, dispatch, history]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
