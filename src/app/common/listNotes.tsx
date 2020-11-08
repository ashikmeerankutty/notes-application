/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Note } from '../shared/db/types';
import NoteItem from './NoteItem';

const listNotesStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

const listNotesWrapperStyles = css`
  padding-top: 10px;
`;

interface ListNotesProps {
  notes: Note[];
  onSelectNote: any;
}

const ListNotes: React.FC<ListNotesProps> = ({
  notes,
  onSelectNote,
}: ListNotesProps) => {
  return (
    <div css={listNotesWrapperStyles}>
      <div css={listNotesStyles}>
        {notes.map((note: Note) => (
          <NoteItem key={note.id} onSelect={() => onSelectNote(note)} note={note} />
        ))}
      </div>
    </div>
  );
};

export default ListNotes;
