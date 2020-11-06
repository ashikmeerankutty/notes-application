/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'src/app/reducers';
import { Note } from 'src/app/shared/db/types';
import ListNotes from '../../common/listNotes';

const archivePageStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
`;

const ArchivePage: React.FC = () => {
  const notes = useSelector((state: State) =>
    state.notes.notes.filter((note: Note) => note.archived)
  );

  return (
    <div css={archivePageStyles}>
      <h3>Archives</h3>
      <ListNotes notes={notes} key="list notes" />
    </div>
  );
};

export default ArchivePage;
