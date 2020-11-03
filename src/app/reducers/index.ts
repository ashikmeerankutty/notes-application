import { combineReducers } from 'redux';
import globals, { GlobalStates } from './globals';
import notes, { NoteState } from './notes';

export interface State {
  globals: GlobalStates;
  notes: NoteState;
}

export default combineReducers({
  globals,
  notes,
});
