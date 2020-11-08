/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListNotes from '../../common/listNotes';
import { State } from '../../reducers';
import { Text } from 'components';
import { EmptyBlock } from '../../shared/components/emptyBlock/emptyBlock';
import { Note } from '../../shared/db/types';
import NoteModal from '../../common/noteModal';

const SearchPage: FunctionComponent = () => {
  const [selectedNote, setSelectedNote] = useState<Note>(null);
  const notes = useSelector((state: State) => state.notes.notes);
  const searchPageStyles = css`
    padding: 30px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: center;
  `;

  const headingStyles = css`
    margin-top: 40px;
  `;

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

  const archivedNotes = notes.filter((note: Note) => note.archived);
  const otherNotes = notes.filter((note: Note) => !note.archived);

  return (
    <div css={searchPageStyles}>
      <Text extraStyles={headingStyles} is="h3">
        Search results...
      </Text>
      {!notes.length ? (
        <EmptyBlock description="No notes found" />
      ) : (
        <div>
          <Text extraStyles={headingStyles} is="h4">
            Archived
          </Text>
          <ListNotes onSelectNote={selectNote} notes={archivedNotes} search />
          <Text extraStyles={headingStyles} is="h4">
            Others
          </Text>
          <ListNotes onSelectNote={selectNote} notes={otherNotes} search />
        </div>
      )}
      {selectedNote && <NoteModal note={selectedNote} onClose={deselectNote} />}
    </div>
  );
};

export default SearchPage;
