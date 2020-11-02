import {
  CREATE_NOTE,
  DELETE_NOTE,
  LOAD_NOTES,
  UPDATE_NOTE,
} from '../actions/actionTypes';
import { Note } from '../shared/db/types';

export interface NoteState {
  notes: Note[];
}

export interface NoteAction {
  type: string;
  note?: Note;
  noteId?: string;
  notes?: Note[];
}

const intialState: NoteState = {
  notes: [],
};

const notes = (state = intialState, action: NoteAction) => {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note],
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.noteId),
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
      };

    case LOAD_NOTES:
      return {
        ...state,
        notes: action.notes,
      };

    default:
      return state;
  }
};

export default notes;
