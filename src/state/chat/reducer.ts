import { Action, ChatsStateType, MessageDirection } from './types';

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const ADD_NEW_MESSAGES = 'ADD_NEW_MESSAGES';
export const DELETE_SESSION = 'DELETE_SESSION';
export const RESET_SESSION = 'RESET_SESSION';
export const LOG_ERROR = 'LOG_ERROR';
export const INIT = 'INIT';
export const SET_LOADING = 'SET_LOADING';

export const initialState: ChatsStateType = { chats: {}, error: '' };

const reducer = (state: ChatsStateType = initialState, action: Action): ChatsStateType => {
  const current: ChatsStateType = state;

  // eslint-disable-next-line no-console
  console.log('payload', action);

  switch (action.type) {
    case INIT:
      return action.payload.chats
        ? {
            error: '',
            chats: action.payload.chats,
          }
        : current;
    case SET_LOADING:
      return {
        ...current,
        chats: {
          ...current.chats,
          [action.payload.id]: {
            ...current.chats[action.payload.id],
            loading: action.payload.loading,
          },
        },
      };
    case ADD_NEW_USER:
      if (current?.chats[action.payload.id]) {
        return current;
      }
      return {
        ...current,
        error: '',
        chats: {
          ...current.chats,
          [action.payload.id]: {
            ...current.chats[action.payload.id],
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
        },
      };

    case ADD_NEW_MESSAGE: {
      const messages = Array.from(current.chats[action.payload.id].messages || []);
      if (action.payload.message) {
        messages.push(action.payload.message);
      }
      return {
        ...current,
        error: '',
        chats: {
          ...current.chats,
          [action.payload.id]: {
            ...current.chats[action.payload.id],
            loading: true,
            messages,
          },
        },
      };
    }

    case ADD_NEW_MESSAGES: {
      const messages = Array.from(current.chats[action.payload.id].messages || []);
      const next = action.payload.messages || [];
      next.forEach((message) => {
        messages.push(message);
      });

      return {
        ...current,
        error: '',
        chats: {
          ...current.chats,
          [action.payload.id]: {
            ...current.chats[action.payload.id],
            loading: true,
            messages,
          },
        },
      };
    }
    case DELETE_SESSION: {
      if (!current.chats[action.payload.id]) return current;
      const { chats } = current;
      delete chats[action.payload.id];
      return {
        ...current,
        error: '',
        chats: { ...chats },
      };
    }

    case RESET_SESSION: {
      if (!current.chats[action.payload.id]) return current;
      return {
        ...current,
        error: '',
        chats: {
          ...current.chats,
          [action.payload.id]: {
            ...current.chats[action.payload.id],
            messages: [
              {
                isInfo: true,
                text: 'Chat has been reset',
                type: 'message',
                direction: MessageDirection.INFO,
              },
            ],
          },
        },
      };
    }

    case LOG_ERROR: {
      return {
        ...current,
        error: action.payload.error || '',
      };
    }
    default:
      return current;
  }
};

export default reducer;
