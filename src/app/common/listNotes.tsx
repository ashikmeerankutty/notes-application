/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Note } from '../shared/db/types';
import NoteItem from './NoteItem';
import NoteModal from './noteModal';

const listNotesStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

const listNotesWrapperStyles = css`
  padding-top: 40px;
`;

interface ListNotesProps {
  notes: Note[];
}

const ListNotes: React.FC<ListNotesProps> = ({ notes }: ListNotesProps) => {
  const [selectedNote, setSelectedNote] = useState<Note>(null);
  const pinnedNotes = notes.filter((notes) => notes.pinned);
  const unPinnedNotes = notes.filter((notes) => !notes.pinned);

  const selectNode = (note: Note) => {
    window.location.hash = `note/${note.id}`;
    setSelectedNote(note);
  };

  const deselectNode = () => {
    window.location.hash = '';
    setSelectedNote(null);
  };

  useEffect(() => {
    const activeNoteDetails = window.location.hash
      .replace(/^#\/?|\/$/g, '')
      .split('/');
    if (activeNoteDetails[0] === 'note' && activeNoteDetails[1] !== '') {
      const activeNote: Note = notes.find(
        (note: Note) => note.id === activeNoteDetails[1]
      );
      setSelectedNote(activeNote);
    }
  }, []);

  return (
    <div css={listNotesWrapperStyles}>
      <h3>Pinned</h3>
      <div css={listNotesStyles}>
        {pinnedNotes.map((note: Note) => (
          <NoteItem key={note.id} onSelect={() => selectNode(note)} note={note} />
        ))}
      </div>
      <h3>Others</h3>
      <div css={listNotesStyles}>
        {unPinnedNotes.map((note) => (
          <NoteItem key={note.id} onSelect={() => selectNode(note)} note={note} />
        ))}
      </div>
      {selectedNote && <NoteModal note={selectedNote} onClose={deselectNode} />}
    </div>
  );
};

export default ListNotes;
