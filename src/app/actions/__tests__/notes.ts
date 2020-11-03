import { Note } from '../../shared/db/types';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from '../actionTypes';
import { createNewNote, deleteNote, loadNotes, updateNote } from '../notes';
import * as notesDb from '../../shared/db/notes';
import { clearStorage } from '../../shared/db/storage';

describe('Note action', () => {
  const sampleNotes: Omit<Note, 'id'>[] = [
    {
      title: 'Test Note',
      notes: 'I am a test Note',
      archived: false,
      pinned: false,
      created: new Date('10/10/2010').toString(),
      lastUpdated: new Date('10/10/2010').toString(),
    },
  ];

  it('create new note', () => {
    const spy = jest.spyOn(notesDb, 'createNewNote');
    expect(createNewNote(sampleNotes[0].title, sampleNotes[0].notes)).toEqual({
      type: CREATE_NOTE,
      note: expect.objectContaining({
        id: expect.any(String),
        title: sampleNotes[0].title,
        notes: sampleNotes[0].notes,
        archived: false,
        pinned: false,
        created: expect.any(String),
        lastUpdated: expect.any(String),
      }),
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(sampleNotes[0].title, sampleNotes[0].notes);
  });

  it('update a note', () => {
    const newNote = notesDb.createNewNote(
      sampleNotes[0].title,
      sampleNotes[0].notes
    );
    const spy = jest.spyOn(notesDb, 'updateNote');
    expect(
      updateNote(newNote.id, { ...newNote, title: 'I am an updated title' })
    ).toEqual({
      type: UPDATE_NOTE,
      note: expect.objectContaining({
        id: expect.any(String),
        title: 'I am an updated title',
        notes: sampleNotes[0].notes,
        archived: false,
        pinned: false,
        created: expect.any(String),
        lastUpdated: expect.any(String),
      }),
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newNote.id, {
      ...newNote,
      title: 'I am an updated title',
    });
  });

  it('delete a note', () => {
    const newNote = notesDb.createNewNote(
      sampleNotes[0].title,
      sampleNotes[0].notes
    );
    const spy = jest.spyOn(notesDb, 'deleteNote');
    expect(deleteNote(newNote.id)).toEqual({
      type: DELETE_NOTE,
      noteId: newNote.id,
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newNote.id);
  });

  it('load notes', () => {
    clearStorage();
    const newNote = notesDb.createNewNote(
      sampleNotes[0].title,
      sampleNotes[0].notes
    );
    const spy = jest.spyOn(notesDb, 'getNotes');
    expect(loadNotes()).toEqual({
      type: LOAD_NOTES,
      notes: [newNote],
    });
    expect(spy).toHaveBeenCalled();
  });
});
