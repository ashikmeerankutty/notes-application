/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { Note } from '../../shared/db/types';
import ListNotes from '../../common/listNotes';
import NewNote from '../../common/newNote';
import { Text } from 'components';

const notePageStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
`;

const headingStyles = css`
  margin-top: 40px;
`;

interface NotePageProps {}

const NotePage: React.FC<NotePageProps> = () => {
  const notes = useSelector((state: State) => state.notes.notes);
  const pinnedNotes = notes.filter((note: Note) => note.pinned);
  const others = notes.filter((note: Note) => !note.pinned);

  return (
    <div css={notePageStyles}>
      <NewNote key="new" />
      <Text extraStyles={headingStyles} is="h4">
        Pinned Notes
      </Text>
      <ListNotes notes={pinnedNotes} />
      <Text extraStyles={headingStyles} is="h4">
        Others
      </Text>
      <ListNotes notes={others} />
    </div>
  );
};

export default NotePage;
