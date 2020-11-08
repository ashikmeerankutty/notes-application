import { Note } from 'src/app/shared/db/types';
import {
  CREATE_NOTE,
  DELETE_NOTE,
  LOAD_NOTES,
  UPDATE_NOTE,
} from '../../actions/actionTypes';
import notesReducer, { NoteAction, NoteState } from '../notes';

describe('Notes reducers', () => {
  const initialState: NoteState = {
    notes: [],
    pinnedNotes: [],
    archivedNotes: [],
    lastLoadedPage: 1,
  };

  const sampleNotes: Note[] = [
    {
      id: '1',
      title: 'Test Note',
      notes: 'I am a test Note',
      archived: false,
      pinned: false,
      created: new Date('10/10/2010').toString(),
      lastUpdated: new Date('10/10/2010').toString(),
    },
  ];

  it('add a note', () => {
    const createNoteAction: NoteAction = {
      type: CREATE_NOTE,
      note: sampleNotes[0],
    };

    const expectedState: NoteState = {
      notes: [sampleNotes[0]],
      pinnedNotes: [],
      archivedNotes: [],
      lastLoadedPage: 1,
    };

    expect(notesReducer(initialState, createNoteAction)).toEqual(expectedState);
  });

  it('delete a note', () => {
    const deleteNoteAction: NoteAction = {
      type: DELETE_NOTE,
      noteId: '1',
    };

    expect(
      notesReducer(
        {
          notes: sampleNotes,
          pinnedNotes: [],
          archivedNotes: [],
          lastLoadedPage: 1,
        },
        deleteNoteAction
      )
    ).toEqual({ ...initialState });

    const deleteNoteAction2: NoteAction = {
      type: DELETE_NOTE,
      noteId: '2',
    };

    expect(
      notesReducer(
        {
          notes: sampleNotes,
          pinnedNotes: [],
          archivedNotes: [],
          lastLoadedPage: 1,
        },
        deleteNoteAction2
      )
    ).toEqual({
      ...initialState,
      notes: sampleNotes,
    });
  });

  it('update a note', () => {
    const updatedNote = {
      id: '1',
      title: 'Test Note',
      notes: 'I am an updated test Note',
      archived: false,
      pinned: false,
      created: new Date('10/10/2010').toString(),
      lastUpdated: new Date('10/10/2010').toString(),
    };
    const updateNoteAction: NoteAction = {
      type: UPDATE_NOTE,
      note: updatedNote,
    };

    expect(
      notesReducer(
        {
          notes: sampleNotes,
          pinnedNotes: [],
          archivedNotes: [],
          lastLoadedPage: 1,
        },
        updateNoteAction
      )
    ).toEqual({
      ...initialState,
      notes: [updatedNote],
    });
  });

  it('load notes', () => {
    const loadNoteAction: NoteAction = {
      type: LOAD_NOTES,
      notes: sampleNotes,
    };

    expect(notesReducer(initialState, loadNoteAction)).toEqual({
      ...initialState,
      notes: sampleNotes,
      lastLoadedPage: undefined,
    });
  });
});
