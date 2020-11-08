import {
  ARCHIVE_NOTE,
  CLEAR_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  LOAD_ARCHIVED_NOTES,
  LOAD_NOTES,
  LOAD_PINNED_NOTES,
  LOAD_SEARCH_NOTES,
  PIN_NOTE,
  UNARCHIVE_NOTE,
  UNPIN_NOTE,
  UPDATE_NOTE,
} from './actionTypes';
import * as notesDb from '../shared/db/notes';
import { Note } from '../shared/db/types';
import { Dispatch } from 'react';

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

export const loadNotes = (
  query?: string,
  page?: number,
  pageSize?: number,
  filterPinned?: boolean
) => (dispatch: Dispatch<any>) => {
  const notes = notesDb.getNotes(query, page, pageSize, filterPinned);
  return dispatch({ type: LOAD_NOTES, notes, page });
};

export const loadSearchResults = (query?: string) => (dispatch: Dispatch<any>) => {
  // console.log(query);
  // if (query === '') {
  //   console.log('Coming..');
  //   const notes = notesDb.getNotes(query, 1, 10, true);
  //   dispatch({ type: CLEAR_NOTES });
  //   return dispatch({ type: LOAD_NOTES, notes, page: 1 });
  // }
  const notes = notesDb.getNotes(query, 1, null, false);
  return dispatch({ type: LOAD_SEARCH_NOTES, notes });
};

export const clearNotes = () => ({ type: CLEAR_NOTES });

export const loadPinnedNotes = () => {
  const notes = notesDb.getPinnedNotes();
  return { type: LOAD_PINNED_NOTES, notes };
};

export const loadArchivedNotes = () => {
  const notes = notesDb.getArchivedNotes();
  return { type: LOAD_ARCHIVED_NOTES, notes };
};

export const archiveNote = (noteId: string, status: boolean) => {
  const archivedNote = notesDb.archiveNote(noteId);
  if (!status) {
    return { type: ARCHIVE_NOTE, note: archivedNote };
  }
  return { type: UNARCHIVE_NOTE, note: archivedNote };
};

export const pinNote = (noteId: string, status: boolean, search?: boolean) => {
  const updatedNote = notesDb.pinNote(noteId);
  if (!status) {
    return { type: PIN_NOTE, note: updatedNote, search };
  }
  return { type: UNPIN_NOTE, note: updatedNote, search };
};
