import { getItemFromStorage, setItemToStorage } from './storage';
import { Note } from './types';
import { v4 as uuid4 } from 'uuid';

export const getNotes = () => {
  return getItemFromStorage('notes') || [];
};

export const addNote = (note: Note) => {
  const notes = getNotes();
  setItemToStorage('notes', [...notes, note]);
};

export const createNewNote = (title: string, notes: string): Note => {
  const newNote: Note = {
    id: uuid4(),
    title,
    notes,
    archived: false,
    pinned: false,
    created: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };

  addNote(newNote);

  return newNote;
};

export const deleteNote = (noteId: string) => {
  const notes = getNotes();
  const filteredNotes = notes.filter((note: Note) => note.id !== noteId);
  setItemToStorage('notes', filteredNotes);
};

export const updateNote = (noteId: string, updatedNote: Note) => {
  const notes = getNotes();
  const updatedNotes = notes.map((note: Note) =>
    note.id !== noteId ? note : updatedNote
  );
  setItemToStorage('notes', updatedNotes);
};

export const getNote = (noteId: string) => {
  const notes = getNotes();
  return notes.find((note: Note) => note.id === noteId);
};
