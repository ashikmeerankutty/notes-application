import {
  SET_LOADING,
  REMOVE_LOADING,
  ADD_TOAST,
  REMOVE_TOAST,
} from '../actions/actionTypes';

export interface GlobalState {
  state: string;
  message: string;
  id?: string;
}

export interface GlobalStates {
  loadingStates: GlobalState[];
  toastStates: GlobalState[];
}

export interface GlobalAction {
  type: string;
  state?: string;
  loading?: GlobalState;
  toast?: GlobalState;
  id?: string;
}

const intialState: GlobalStates = {
  loadingStates: [],
  toastStates: [],
};

const globals = (state = intialState, action: GlobalAction) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loadingStates: [...state.loadingStates, action.loading],
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loadingStates: state.loadingStates.filter(
          (loading: GlobalState) => loading.state !== action.state
        ),
      };
    case ADD_TOAST:
      return {
        ...state,
        toastStates: [...state.toastStates, action.toast],
      };
    case REMOVE_TOAST:
      return {
        ...state,
        toastStates: state.toastStates.filter(
          (toast: GlobalState) => toast.id !== action.id
        ),
      };
    default:
      return state;
  }
};

export default globals;
