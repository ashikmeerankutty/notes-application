/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes, createNewNote } from '../../actions/notes';

const newNoteStyles = css`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  margin: 0 auto;
`;

interface NewNoteProps {}

const NewNote: React.FC<NewNoteProps> = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNotes('', 1, 10));
  }, [dispatch]);

  const saveNote = () => {
    if (title && note) {
      dispatch(createNewNote(title, note));
    }
  };

  return (
    <div css={newNoteStyles}>
      <input
        aria-label="note title"
        key="title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <textarea
        aria-label="note"
        key="note"
        value={note}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
      />
      <button key="add" onClick={saveNote} type="button">
        Add
      </button>
    </div>
  );
};

export default NewNote;
