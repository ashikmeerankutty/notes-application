import { getItemFromStorage, setItemToStorage } from './storage';
import { Note } from './types';

export const getNotes = () => {
  return getItemFromStorage('notes') || [];
};

export const addNote = (note: Note) => {
  const notes = getNotes();
  setItemToStorage('notes', [...notes, note]);
};

export const deleteNote = (noteId: number) => {
  const notes = getNotes();
  const filteredNotes = notes.filter((note: Note) => note.id !== noteId);
  setItemToStorage('notes', filteredNotes);
};

export const updateNote = (noteId: number, updatedNote: Note) => {
  const notes = getNotes();
  const updatedNotes = notes.map((note: Note) =>
    note.id !== noteId ? note : updatedNote
  );
  setItemToStorage('notes', updatedNotes);
};

export const getNote = (noteId: number) => {
  const notes = getNotes();
  return notes.find((note: Note) => note.id === noteId);
};
