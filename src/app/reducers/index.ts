import { combineReducers } from 'redux';
import globals, { GlobalStates } from './globals';

export interface State {
  globals: GlobalStates;
}

export default combineReducers({
  globals,
});
