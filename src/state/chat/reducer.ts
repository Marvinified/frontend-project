import { Action, ChatsStateType, MessageDirection } from './types';

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const ADD_NEW_MESSAGES = 'ADD_NEW_MESSAGES';
export const INIT = 'INIT';
export const SET_LOADING = 'SET_LOADING';

export const initialState: ChatsStateType = {};

const reducer = (state: ChatsStateType = initialState, action: Action): ChatsStateType => {
  switch (action.type) {
    case INIT:
      return action.payload.chats || state;
    case SET_LOADING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: action.payload.loading,
        },
      };
    case ADD_NEW_USER:
      if (state[action.payload.id]) {
        return state;
      }
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: true,
          name: action.payload.name,
          messages: [
            {
              isInfo: true,
              text: 'Chat initialized',
              type: 'message',
              direction: MessageDirection.INFO,
            },
          ],
        },
      };

    case ADD_NEW_MESSAGE: {
      const messages = Array.from(state[action.payload.id].messages || []);
      if (action.payload.message) {
        messages.push(action.payload.message);
      }
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: true,
          messages,
        },
      };
    }

    case ADD_NEW_MESSAGES: {
      const messages = Array.from(state[action.payload.id].messages || []);
      const next = action.payload.messages || [];
      next.forEach((message) => {
        messages.push(message);
      });

      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: true,
          messages,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
