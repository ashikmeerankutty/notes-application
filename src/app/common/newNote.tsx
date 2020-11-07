/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme } from 'components';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import NoteModal, { noteInputStyle } from './noteModal';

const newNoteStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  cursor: text;
`;

interface NewNoteProps {}

const NewNote: React.FC<NewNoteProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme<Theme>();

  return (
    <div>
      <div
        css={newNoteStyles}
        onClick={() => {
          setShowModal(true);
        }}
        onKeyDown={() => setShowModal(true)}
      >
        <input
          css={noteInputStyle(theme)}
          aria-label="note title"
          key="title"
          readOnly
          type="text"
          placeholder="Take a note.."
        />
      </div>
      {showModal && <NoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default NewNote;
