import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './actionTypes';
import * as notesDb from '../shared/db/notes';
import { Note } from '../shared/db/types';

export const createNewNote = (
  title: string,
  notes: string,
  onCreate?: (note: Note) => void
) => {
  const note = notesDb.createNewNote(title, notes);
  onCreate(note);
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

export const loadNotes = (query?: string, page?: number, pageSize?: number) => {
  const notes = notesDb.getNotes(query, page, pageSize);
  return { type: LOAD_NOTES, notes };
};

export const archiveNote = (noteId: string) => {
  const archivedNote = notesDb.archiveNote(noteId);
  return { type: UPDATE_NOTE, note: archivedNote };
};

export const pinNote = (noteId: string) => {
  const pinnedNote = notesDb.pinNote(noteId);
  return { type: UPDATE_NOTE, note: pinnedNote };
};
