/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducers';
import { Note } from '../../shared/db/types';
import ListNotes from '../../common/listNotes';
import NewNote from '../../common/newNote';
import { Button, Text } from 'components';
import { loadNotes, loadPinnedNotes } from '../../actions/notes';
import { EmptyBlock } from '../../shared/components/emptyBlock/emptyBlock';
import NoteModal from '../../common/noteModal';

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

const loadMoreStyles = css`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

interface NotePageProps {}

const NotePage: React.FC<NotePageProps> = () => {
  const [selectedNote, setSelectedNote] = useState<Note>(null);

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

  const selectNote = (note: Note) => {
    window.location.hash = `note/${note.id}`;
    setSelectedNote(note);
  };

  const deselectNote = () => {
    window.location.hash = '';
    setSelectedNote(null);
  };

  useEffect(() => {
    const activeNoteDetails = window.location.hash
      .replace(/^#\/?|\/$/g, '')
      .split('/');
    if (activeNoteDetails[0] === 'note' && activeNoteDetails[1] !== '') {
      const activeNote: Note = [...pinnedNotes, ...notes].find(
        (note: Note) => note.id === activeNoteDetails[1]
      );
      setSelectedNote(activeNote);
    }
  }, [notes]);

  return (
    <div css={notePageStyles}>
      <NewNote key="new" />
      {pinnedNotes.length ? (
        <React.Fragment>
          <Text extraStyles={headingStyles} is="h4">
            Pinned
          </Text>
          <ListNotes notes={pinnedNotes} onSelectNote={selectNote} search={false} />
          <Text extraStyles={headingStyles} is="h4">
            Others
          </Text>
        </React.Fragment>
      ) : null}
      {notes.length ? (
        <React.Fragment>
          <ListNotes notes={notes} onSelectNote={selectNote} search={false} />
          <div css={loadMoreStyles}>
            <Button onClick={loadMore}>Load More</Button>
          </div>
        </React.Fragment>
      ) : (
        <EmptyBlock description="Nothing here..." />
      )}
      {selectedNote && <NoteModal note={selectedNote} onClose={deselectNote} />}
    </div>
  );
};

export default NotePage;
