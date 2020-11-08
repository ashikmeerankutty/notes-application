/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducers';
import ListNotes from '../../common/listNotes';
import { Text } from 'components';
import { loadArchivedNotes } from '../../actions/notes';
import { EmptyBlock } from '../../shared/components/emptyBlock/emptyBlock';
import NoteModal from '../../common/noteModal';
import { Note } from '../../shared/db/types';

const archivePageStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
`;

const headingStyles = css`
  margin-top: 40px;
`;

const ArchivePage: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState<Note>(null);

  const notes = useSelector((state: State) => state.notes.archivedNotes);

  useEffect(() => {
    document.title = 'Noty | Archived';
    dispatch(loadArchivedNotes());
  }, []);

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
      const activeNote: Note = notes.find(
        (note: Note) => note.id === activeNoteDetails[1]
      );
      setSelectedNote(activeNote);
    }
  }, [notes]);

  if (!notes.length) {
    return <EmptyBlock description="Nothing here..." />;
  }

  return (
    <div css={archivePageStyles}>
      <Text extraStyles={headingStyles} is="h4">
        Archived
      </Text>
      <ListNotes notes={notes} onSelectNote={selectNote} key="list notes" />
      {selectedNote && <NoteModal note={selectedNote} onClose={deselectNote} />}
    </div>
  );
};

export default ArchivePage;
