import {
  addNote,
  createNewNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '../notes';
import { getItemFromStorage, setItemToStorage, clearStorage } from '../storage';
import { Note } from '../types';

describe('Local storage', () => {
  const data = {
    hello: 'world',
  };

  it('set data to local storage', () => {
    setItemToStorage('data', data);
    const result = localStorage.getItem('data');
    expect(JSON.parse(result)).toEqual(data);
  });

  it('get data from localstorage', () => {
    setItemToStorage('data', data);
    const result = getItemFromStorage('data');
    expect(result).toEqual(data);
  });
});

describe('Note CRUD Operations', () => {
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

  it('Add a note to storage', () => {
    const newNote: Note = sampleNotes[0];
    addNote(newNote);
    expect(getItemFromStorage('notes')).toContainEqual(newNote);
  });

  it('Create new note', () => {
    const newNote = createNewNote(sampleNotes[0].title, sampleNotes[0].notes);
    expect(newNote).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: sampleNotes[0].title,
        notes: sampleNotes[0].notes,
        archived: false,
        pinned: false,
        created: expect.any(String),
        lastUpdated: expect.any(String),
      })
    );
    expect(getItemFromStorage('notes')).toContainEqual(newNote);
  });

  it('Delete a note from storage', () => {
    const removeId = '1';
    setItemToStorage('notes', sampleNotes);
    deleteNote(removeId);
    expect(getItemFromStorage('notes')).not.toContainEqual(
      expect.objectContaining({ id: removeId })
    );
  });

  it('Update a note from storage', () => {
    const updatedNote: Note = {
      id: '1',
      title: 'Test Updated Note',
      notes: 'I am a test Note',
      archived: false,
      pinned: false,
      created: new Date('10/10/2010').toISOString(),
      lastUpdated: new Date('10/10/2011').toISOString(),
    };

    setItemToStorage('notes', sampleNotes);
    updateNote(updatedNote.id, updatedNote);
    expect(getItemFromStorage('notes')).toContainEqual(updatedNote);
  });

  describe('Get notes from storage', () => {
    it('returns notes as array', () => {
      setItemToStorage('notes', sampleNotes);
      const notes = getNotes();
      expect(notes).toEqual(sampleNotes);
    });

    it('return empty array if no notes', () => {
      clearStorage();
      const notes = getNotes();
      expect(notes).toEqual([]);
    });
  });

  it('Get a note from storage', () => {
    const noteId = '1';
    setItemToStorage('notes', sampleNotes);
    const result = getNote(noteId);
    expect(result).toEqual(sampleNotes[0]);
  });
});
