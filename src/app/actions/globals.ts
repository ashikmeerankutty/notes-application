import { SET_LOADING, REMOVE_LOADING } from './actionTypes';

export const setLoading = (state: string, message: string) => ({
  type: SET_LOADING,
  loading: { state, message },
});

export const removeLoading = (state: string) => ({
  type: REMOVE_LOADING,
  state,
});
