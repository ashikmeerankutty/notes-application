import {
  ARCHIVE_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  LOAD_ARCHIVED_NOTES,
  LOAD_NOTES,
  LOAD_PINNED_NOTES,
  PIN_NOTE,
  UNARCHIVE_NOTE,
  UNPIN_NOTE,
  UPDATE_NOTE,
} from '../actions/actionTypes';
import { Note } from '../shared/db/types';

export interface NoteState {
  notes: Note[];
  pinnedNotes: Note[];
  archivedNotes: Note[];
  lastLoadedPage: number;
}

export interface NoteAction {
  type: string;
  note?: Note;
  noteId?: string;
  page?: number;
  notes?: Note[];
}

const intialState: NoteState = {
  notes: [],
  pinnedNotes: [],
  archivedNotes: [],
  lastLoadedPage: 1,
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
        archivedNotes: state.archivedNotes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
        pinnedNotes: state.pinnedNotes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
      };

    case PIN_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.note.id),
        pinnedNotes: [...state.pinnedNotes, action.note],
      };

    case UNPIN_NOTE:
      return {
        ...state,
        pinnedNotes: state.pinnedNotes.filter((note) => note.id !== action.note.id),
        notes: [...state.notes, action.note],
      };

    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
        archivedNotes: [...state.archivedNotes, action.note],
      };

    case UNARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
        archivedNotes: state.archivedNotes.filter(
          (note) => note.id !== action.note.id
        ),
      };

    case LOAD_NOTES:
      return {
        ...state,
        notes: action.notes,
        lastLoadedPage: action.page,
      };

    case LOAD_PINNED_NOTES:
      return {
        ...state,
        pinnedNotes: action.notes,
      };
    case LOAD_ARCHIVED_NOTES:
      return {
        ...state,
        archivedNotes: action.notes,
      };

    default:
      return state;
  }
};

export default notes;
