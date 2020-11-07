/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducers';
import ListNotes from '../../common/listNotes';
import { Text } from 'components';
import { loadArchivedNotes } from '../../actions/notes';

const archivePageStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
  @media (max-width: 425px) {
    margin-left: 64px;
  }
`;

const headingStyles = css`
  margin-top: 40px;
`;

const ArchivePage: React.FC = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state: State) => state.notes.archivedNotes);

  useEffect(() => {
    dispatch(loadArchivedNotes());
  }, []);

  return (
    <div css={archivePageStyles}>
      <Text extraStyles={headingStyles} is="h4">
        Archives
      </Text>
      <ListNotes notes={notes} key="list notes" />
    </div>
  );
};

export default ArchivePage;
