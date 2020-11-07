/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { PinIcon, EyeOpenIcon, RefreshIcon, ArchiveIcon } from '@space-kit/icons';
import { Modal, IconButton, Theme, Button } from 'components';
import { useTheme } from 'emotion-theming';
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../actions/globals';
import { archiveNote, createNewNote, pinNote, updateNote } from '../actions/notes';
import { Note } from '../shared/db/types';
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

const refreshIconStyles = (spin: boolean) => css`
  transform-origin: 50%;
  animation: ${spin ? 'spin infinite 2s' : 'none'};
  width: 16px;
  height: 16px;
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
`;

const NoteModal: FunctionComponent<NoteModalProps> = ({
  note,
  onClose,
}: NoteModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [updatedNote, setUpdatedNote] = useState<Note>(null);
  const [description, setDescription] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [archived, setArchived] = useState(false);
  const [preview, setPreview] = useState(false);

  const dispatch = useDispatch();
  const theme = useTheme<Theme>();

  const mainInput = useRef(null);

  useEffect(() => {
    if (note) {
      setUpdatedNote(note);
      setTitle(note.title);
      setDescription(note.notes);
      setPinned(note.pinned);
      setArchived(note.archived);
    }
  }, [note]);

  useEffect(() => {
    mainInput.current.focus();
  }, []);

  const onNoteCreate = (note: Note) => {
    const updatedNote = { ...note, archived: archived, pinned: pinned };
    setUpdatedNote(updatedNote);
    window.location.hash = `note/${updatedNote.id}`;
  };

  const onSave = (updatedTitle: string = '', updatedDescription: string = '') => {
    setIsUpdating(true);
    if (!updatedNote) {
      if (updatedTitle || updatedDescription) {
        dispatch(createNewNote(updatedTitle, updatedDescription, onNoteCreate));
      }
    } else {
      dispatch(
        updateNote(updatedNote.id, {
          ...updatedNote,
          title: updatedTitle || title,
          notes: updatedDescription || description,
          pinned,
        })
      );
    }
    setTimeout(() => {
      setIsUpdating(false);
    }, 1500);
  };

  const onPreviewClick = () => {
    setPreview(!preview);
  };

  const onPinPressed = () => {
    if (updateNote) {
      setPinned(!pinned);
      if (updatedNote.id) {
        dispatch(pinNote(updatedNote.id, pinned));
        const pinnedMessage = !pinned ? 'Note pinned' : 'Note unpinned';
        dispatch(showToast('success', pinnedMessage));
      }
    }
  };

  const onArchivePressed = () => {
    if (updateNote) {
      setArchived(!archived);
      if (updatedNote.id) {
        dispatch(archiveNote(updatedNote.id, archived));
        const archivedMessage = !archived ? 'Note archived' : 'Note unarchived';
        dispatch(showToast('success', archivedMessage));
      }
    }
  };

  return (
    <Modal onClose={onClose} show={true}>
      <div css={noteTitleStyles}>
        <input
          ref={mainInput}
          css={noteInputStyle(theme)}
          aria-label="note title"
          key="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onSave(e.target.value, '');
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Title"
        />
        <div css={refreshIconStyles(isUpdating)}>
          <RefreshIcon color={theme.colors.text} size={16} />
        </div>
      </div>
      <div css={noteViewStyles}>
        <textarea
          css={noteDescriptionStyles(theme)}
          rows={10}
          aria-label="note"
          placeholder="Take a note.."
          key="note"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onSave('', e.target.value);
            setDescription(e.target.value);
          }}
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
          <IconButton active={pinned} onClick={onPinPressed} Icon={PinIcon} />
          <IconButton
            active={archived}
            onClick={onArchivePressed}
            Icon={ArchiveIcon}
          />
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default NoteModal;
