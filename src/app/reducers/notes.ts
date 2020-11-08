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
  search?: boolean;
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
        pinnedNotes: state.pinnedNotes.filter((note) => note.id !== action.noteId),
        archivedNotes: state.archivedNotes.filter(
          (note) => note.id !== action.noteId
        ),
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
      if (action.search) {
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.note.id ? action.note : note
          ),
        };
      }
      if (!state.notes.find((note) => note.id === action.note.id)) {
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.note.id ? action.note : note
          ),
          pinnedNotes: [...state.pinnedNotes, action.note],
        };
      }
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.note.id),
        pinnedNotes: [...state.pinnedNotes, action.note],
      };

    case UNPIN_NOTE:
      if (action.search) {
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.note.id ? action.note : note
          ),
        };
      }
      if (state.notes.find((note) => note.id === action.note.id)) {
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.note.id ? action.note : note
          ),
          pinnedNotes: state.pinnedNotes.filter(
            (note) => note.id !== action.note.id
          ),
        };
      }
      return {
        ...state,
        notes: [...state.notes, action.note],
        pinnedNotes: state.pinnedNotes.filter((note) => note.id !== action.note.id),
      };

    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
        pinnedNotes: state.pinnedNotes.filter((note) => note.id !== action.note.id),
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
