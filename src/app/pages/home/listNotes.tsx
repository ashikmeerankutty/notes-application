/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';

const listNotesStyles = css`
  display: flex;
`;

interface ListNotesProps {}

const ListNotes: React.FC<ListNotesProps> = () => {
  const notes = useSelector((state: State) => state.notes.notes);

  return (
    <div css={listNotesStyles}>
      {notes.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
};

export default ListNotes;
