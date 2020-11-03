import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './actionTypes';
import * as notesDb from '../shared/db/notes';
import { Note } from '../shared/db/types';

export const createNewNote = (title: string, notes: string) => {
  const note = notesDb.createNewNote(title, notes);
  return { type: CREATE_NOTE, note: note };
};

export const updateNote = (noteId: string, note: Note) => {
  notesDb.updateNote(noteId, note);
  return { type: UPDATE_NOTE, note: note };
};

export const deleteNote = (noteId: string) => {
  notesDb.deleteNote(noteId);
  return { type: DELETE_NOTE, noteId };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loadNotes = (query: string, page: number, pageSize: number) => {
  const notes = notesDb.getNotes();
  return { type: LOAD_NOTES, notes };
};
