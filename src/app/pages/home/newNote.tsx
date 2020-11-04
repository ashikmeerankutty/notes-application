/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { EyeOpenIcon, PinIcon } from '@space-kit/icons';
import { IconButton, Modal, Theme } from 'components';
import { useTheme } from 'emotion-theming';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes, createNewNote } from '../../actions/notes';
import Markdown from './markdown';

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

const noteTitleStyles = css`
  display: flex;
`;

const noteInputStyle = (theme: Theme) => css`
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 500;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

const noteDescriptionStyles = (theme: Theme) => css`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  flex-grow: 1;
  flex-basis: 0;
`;

const notesToolbarStyles = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const noteViewStyles = css`
  margin-top: 20px;
  display: flex;
`;

const notePreviewStyles = css`
  margin-top: 0;
  flex-grow: 1;
  flex-basis: 0;
`;

interface NewNoteProps {}

const NewNote: React.FC<NewNoteProps> = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [preview, setPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const theme = useTheme<Theme>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNotes('', 1, 10));
  }, [dispatch]);

  const saveNote = () => {
    if (title || note) {
      dispatch(createNewNote(title, note));
    }
  };

  const onPreviewClick = () => {
    setPreview(!preview);
  };

  const showNewNote = () => {
    setShowModal(true);
    if (textAreaRef && textAreaRef.current) {
      console.log(textAreaRef.current);
    }
  };

  return (
    <div>
      <div
        css={newNoteStyles}
        onClick={() => {
          showNewNote();
        }}
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
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div css={noteTitleStyles}>
          <input
            css={noteInputStyle(theme)}
            aria-label="note title"
            key="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <IconButton Icon={PinIcon} />
        </div>
        <div css={noteViewStyles}>
          <textarea
            css={noteDescriptionStyles(theme)}
            rows={10}
            aria-label="note"
            placeholder="Take a note.."
            key="note"
            value={note}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNote(e.target.value)
            }
            ref={textAreaRef}
          />
          {preview && (
            <div css={notePreviewStyles}>
              <Markdown text={note} />
            </div>
          )}
        </div>
        <div css={notesToolbarStyles}>
          <div>
            <IconButton
              active={preview}
              onClick={onPreviewClick}
              Icon={EyeOpenIcon}
            />
          </div>
          <button key="add" onClick={saveNote} type="button">
            Save Note
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NewNote;
