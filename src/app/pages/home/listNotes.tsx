/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { Note } from '../../shared/db/types';
import NoteItem from './NoteItem';
import NoteModal from './noteModal';

const listNotesStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

const listNotesWrapperStyles = css`
  padding-top: 40px;
`;

interface ListNotesProps {
  notes: Note[];
}

const ListNotes: React.FC<ListNotesProps> = ({ notes }: ListNotesProps) => {
  const [selectedNote, setSelectedNote] = useState<Note>(null);
  // const dispatch = useDispatch();

  // const onPinClick = (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>,
  //   id: string
  // ) => {
  //   dispatch(pinNote(id));
  //   event.stopPropagation();
  // };

  const pinnedNotes = notes.filter((notes) => notes.pinned);
  const unPinnedNotes = notes.filter((notes) => !notes.pinned);

  return (
    <div css={listNotesWrapperStyles}>
      <h3>Pinned</h3>
      <div css={listNotesStyles}>
        {pinnedNotes.map((note: Note) => (
          <NoteItem
            key={note.id}
            onSelect={() => setSelectedNote(note)}
            note={note}
          />
        ))}
      </div>
      <h3>Others</h3>
      <div css={listNotesStyles}>
        {unPinnedNotes.map((note) => (
          <NoteItem
            key={note.id}
            onSelect={() => setSelectedNote(note)}
            note={note}
          />
        ))}
      </div>
      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
};

export default ListNotes;
