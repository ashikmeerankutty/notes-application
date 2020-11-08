import { Dispatch } from 'react';
import { SET_LOADING, REMOVE_LOADING, ADD_TOAST, REMOVE_TOAST } from './actionTypes';
import { v4 as uuid4 } from 'uuid';

export const setLoading = (state: string, message: string) => ({
  type: SET_LOADING,
  loading: { state, message },
});

export const removeLoading = (state: string) => ({
  type: REMOVE_LOADING,
  state,
});

export const addToast = (id: string, state: string, message: string) => ({
  type: ADD_TOAST,
  toast: { id, state, message },
});

export const removeToast = (id: string) => ({
  type: REMOVE_TOAST,
  id,
});

export const showToast = (state: string, message: string) => (
  dispatch: Dispatch<any>
) => {
  const id = uuid4();
  setTimeout(() => {
    dispatch(removeToast(id));
  }, 1000);
  dispatch(addToast(id, state, message));
};
