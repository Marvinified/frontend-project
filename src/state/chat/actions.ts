import { RequestType } from '@voiceflow/general-types';
import { History } from 'history';
import * as React from 'react';
import voiceflow from 'src/services/voiceflow';

import { ADD_NEW_MESSAGE, ADD_NEW_MESSAGES, ADD_NEW_USER, DELETE_SESSION, LOG_ERROR, RESET_SESSION, SET_LOADING } from './reducer';
import { Action, MessageDirection, MessageType } from './types';

const logError = (dispatch: React.Dispatch<Action>) => (error: string) => {
  dispatch({ type: LOG_ERROR, payload: { id: 'all', error } });
};
const getChatResponse =
  (dispatch: React.Dispatch<Action>) =>
  async (id: string, message: string, type: RequestType = RequestType.LAUNCH) => {
    try {
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
      dispatch({
        type: ADD_NEW_MESSAGES,
        payload: { id, messages },
      });
      dispatch({
        type: SET_LOADING,
        payload: {
          id,
          loading: false,
        },
      });
    } catch (e: unknown) {
      const error = e as Error;
      logError(dispatch)(error.message);
      dispatch({
        type: SET_LOADING,
        payload: {
          id,
          loading: false,
        },
      });
    }
  };

const addNewUser =
  (dispatch: React.Dispatch<Action>, history: History) =>
  async (username: string): Promise<void> => {
    const id = username?.replace(/\s/g, '');
    try {
      if (id) {
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
      }
    } catch (e: unknown) {
      const error = e as Error;
      logError(dispatch)(error.message);
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
    try {
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
      }
    } catch (e: unknown) {
      const error = e as Error;
      logError(dispatch)(error.message);
      dispatch({
        type: SET_LOADING,
        payload: {
          id: userId,
          loading: false,
        },
      });
    }
  };

const deleteSession =
  (dispatch: React.Dispatch<Action>) =>
  (id: string): void => {
    dispatch({
      type: DELETE_SESSION,
      payload: { id },
    });
  };

const resetSession =
  (dispatch: React.Dispatch<Action>) =>
  async (id: string): Promise<void> => {
    try {
      dispatch({
        type: RESET_SESSION,
        payload: { id },
      });

      await getChatResponse(dispatch)(id, '');
    } catch (e: unknown) {
      const error = e as Error;
      logError(dispatch)(error.message);
      dispatch({
        type: SET_LOADING,
        payload: {
          id,
          loading: false,
        },
      });
    }
  };

export default {
  addNewUser,
  sendMessage,
  deleteSession,
  resetSession,
};
