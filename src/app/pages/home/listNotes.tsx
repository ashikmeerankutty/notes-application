/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Note } from '../../shared/db/types';

const listNotesStyles = css`
  display: flex;
`;

interface ListNotesProps {
  notes: Note[];
  setSelectedNote: (id: string) => void;
}

const ListNotes: React.FC<ListNotesProps> = ({
  notes,
  setSelectedNote,
}: ListNotesProps) => {
  return (
    <div css={listNotesStyles}>
      {notes.map((note) => (
        <div
          onClick={() => {
            setSelectedNote(note.id);
          }}
          key={note.id}
        >
          {note.title}
        </div>
      ))}
    </div>
  );
};

export default ListNotes;
