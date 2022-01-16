import { RequestType } from '@voiceflow/general-types';
import { History } from 'history';
import * as React from 'react';
import voiceflow from 'src/services/voiceflow';

import { ADD_NEW_MESSAGE, ADD_NEW_MESSAGES, ADD_NEW_USER, SET_LOADING } from './reducer';
import { Action, MessageDirection, MessageType } from './types';

const getChatResponse =
  (dispatch: React.Dispatch<Action>) =>
  async (id: string, message: string, type: RequestType = RequestType.LAUNCH) => {
    const response = await voiceflow.interact(id, message, type);
    const messages: Array<MessageType> = [];
    response.forEach((message) => {
      messages.push({
        text: message.payload?.message,
        src: message.payload?.src,
        type: message.type,
        direction: MessageDirection.INCOMING,
      });
    });
    // eslint-disable-next-line no-console
    console.log('run');

    dispatch({
      type: ADD_NEW_MESSAGES,
      payload: { id, messages },
    });
  };

const addNewUser =
  (dispatch: React.Dispatch<Action>, history: History) =>
  async (username: string): Promise<void> => {
    if (username) {
      const id = username.replace(/\s/g, '');
      dispatch({
        type: ADD_NEW_USER,
        payload: {
          id,
          name: username,
          loading: true,
        },
      });
      history.push(`/chats/${id}`);
      await getChatResponse(dispatch)(id, '');
      dispatch({
        type: SET_LOADING,
        payload: {
          id,
          loading: false,
        },
      });
    }
  };

const sendMessage =
  (dispatch: React.Dispatch<Action>) =>
  async (userId: string, message: string): Promise<void> => {
    if (userId) {
      dispatch({
        type: ADD_NEW_MESSAGE,
        payload: {
          id: userId,
          message: {
            text: message,
            type: 'text',
            direction: MessageDirection.OUTGOING,
          },
        },
      });
      await getChatResponse(dispatch)(userId, message, RequestType.TEXT);
      dispatch({
        type: SET_LOADING,
        payload: {
          id: userId,
          loading: false,
        },
      });
    }
  };

export default {
  addNewUser,
  sendMessage,
};
