/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducers';
import { Note } from '../../shared/db/types';
import ListNotes from '../../common/listNotes';
import NewNote from '../../common/newNote';
import { Button, Text } from 'components';
import { loadNotes, loadPinnedNotes } from '../../actions/notes';

const notePageStyles = css`
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

const loadMoreStyles = css`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

interface NotePageProps {}

const NotePage: React.FC<NotePageProps> = () => {
  const { notes, page } = useSelector((state: State) => ({
    notes: state.notes.notes.filter((note: Note) => !note.archived),
    page: state.notes.lastLoadedPage,
  }));

  const pinnedNotes = useSelector((state: State) =>
    state.notes.pinnedNotes.filter((note: Note) => !note.archived)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadNotes(null, 1, 10, true));
    dispatch(loadPinnedNotes());
  }, []);

  const loadMore = () => {
    dispatch(loadNotes(null, page + 1, 10, true));
  };

  return (
    <div css={notePageStyles}>
      <NewNote key="new" />
      <Text extraStyles={headingStyles} is="h4">
        Pinned
      </Text>
      <ListNotes notes={pinnedNotes} />
      <Text extraStyles={headingStyles} is="h4">
        Others
      </Text>
      <ListNotes notes={notes} />
      <div css={loadMoreStyles}>
        <Button onClick={loadMore}>Load More</Button>
      </div>
    </div>
  );
};

export default NotePage;
