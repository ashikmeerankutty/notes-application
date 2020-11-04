/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { PinIcon } from '@space-kit/icons';
import { IconButton } from 'components';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../actions/notes';
import { Note } from '../../shared/db/types';

const listNotesStyles = css`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
`;

interface ListNotesProps {
  notes: Note[];
  setSelectedNote: (id: string) => void;
}

const ListNotes: React.FC<ListNotesProps> = ({
  notes,
  setSelectedNote,
}: ListNotesProps) => {
  const dispatch = useDispatch();

  const onPinClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    const note = notes.find((note) => note.id === id);
    const updatedNote = { ...note, pinned: !note.pinned };
    dispatch(updateNote(id, updatedNote));
    event.stopPropagation();
  };

  const pinnedNotes = notes.filter((notes) => notes.pinned);

  return (
    <div css={listNotesStyles}>
      <h3>Pinned</h3>
      {pinnedNotes.map((note: Note) => (
        <div
          onClick={() => {
            setSelectedNote(note.id);
          }}
          key={note.id}
        >
          {note.title}
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onPinClick(e, note.id)
            }
            Icon={PinIcon}
          />
        </div>
      ))}

      <h3>Not pinned</h3>
      {notes.map((note) => (
        <div
          onClick={() => {
            setSelectedNote(note.id);
          }}
          key={note.id}
        >
          {note.title}
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onPinClick(e, note.id)
            }
            Icon={PinIcon}
          />
        </div>
      ))}
    </div>
  );
};

export default ListNotes;
