import { SET_LOADING, REMOVE_LOADING } from '../actions/actionTypes';

export interface GlobalState {
  state: string;
  message: string;
}

export interface GlobalStates {
  loadingStates: GlobalState[];
}

export interface GlobalAction {
  type: string;
  state?: string;
  loading?: GlobalState;
}

const intialState: GlobalStates = {
  loadingStates: [],
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
    default:
      return state;
  }
};

export default globals;
