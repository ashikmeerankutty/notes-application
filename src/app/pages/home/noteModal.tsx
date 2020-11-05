/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { PinIcon, EyeOpenIcon } from '@space-kit/icons';
import { Modal, IconButton, Theme } from 'components';
import { useTheme } from 'emotion-theming';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewNote, updateNote } from '../../actions/notes';
import { Note } from '../../shared/db/types';
import Markdown from './markdown';

interface NoteModalProps {
  note?: Note;
  onClose: () => void;
}

const noteTitleStyles = css`
  display: flex;
`;

export const noteInputStyle = (theme: Theme) => css`
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

const NoteModal: FunctionComponent<NoteModalProps> = ({
  note,
  onClose,
}: NoteModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [updatedNote, setUpdatedNote] = useState<Note>(null);
  const [description, setDescription] = useState<string>('');
  const [preview, setPreview] = useState(false);

  const dispatch = useDispatch();
  const theme = useTheme<Theme>();

  useEffect(() => {
    if (note) {
      setUpdatedNote(note);
      setTitle(note.title);
      setDescription(note.notes);
    }
  }, [note]);

  const onNoteCreate = (note: Note) => {
    setUpdatedNote(note);
  };

  const onSave = () => {
    if (!updatedNote) {
      if (title || note) {
        dispatch(createNewNote(title, description, onNoteCreate));
      }
    } else {
      dispatch(
        updateNote(updatedNote.id, { ...updatedNote, title, notes: description })
      );
    }
  };

  const onPreviewClick = () => {
    setPreview(!preview);
  };

  return (
    <Modal onClose={onClose} show={true}>
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
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        {preview && (
          <div css={notePreviewStyles}>
            <Markdown text={description} />
          </div>
        )}
      </div>
      <div css={notesToolbarStyles}>
        <div>
          <IconButton active={preview} onClick={onPreviewClick} Icon={EyeOpenIcon} />
        </div>
        <button key="add" onClick={onSave} type="button">
          Save Note
        </button>
      </div>
    </Modal>
  );
};

export default NoteModal;
