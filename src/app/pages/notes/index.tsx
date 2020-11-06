/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'src/app/reducers';
import { Note } from 'src/app/shared/db/types';
import ListNotes from '../../common/listNotes';
import NewNote from '../../common/newNote';

const notePageStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
`;

interface NotePageProps {}

const NotePage: React.FC<NotePageProps> = () => {
  const notes = useSelector((state: State) => state.notes.notes);
  const pinnedNotes = notes.filter((note: Note) => note.pinned);
  const others = notes.filter((note: Note) => !note.pinned);

  return (
    <div css={notePageStyles}>
      <NewNote key="new" />
      <h3>Pinned Notes</h3>
      <ListNotes notes={pinnedNotes} />
      <h3>Others</h3>
      <ListNotes notes={others} />
    </div>
  );
};

export default NotePage;
