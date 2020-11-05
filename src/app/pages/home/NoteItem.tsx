/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { MoreIcon, PinIcon } from '@space-kit/icons';
import { IconButton, Theme } from 'components';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Note } from 'src/app/shared/db/types';

const noteItemStyles = (theme: Theme) => css`
  position: relative;
  width: 250px;
  min-height: 100px;
  margin: 10px 10px 10px 0px;
  padding: 10px;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.border};
  border-radius: 5px;
  transition: 0.3s ease;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .noteItemStyles__pin {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 32px;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .noteItemStyles__toolbar {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.5s;
  }
  &:hover {
    transition: 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px;
    .noteItemStyles__pin,
    .noteItemStyles__toolbar {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }
  cursor: default;
`;

interface NoteItemProps {
  note: Note;
  onSelect: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onSelect }: NoteItemProps) => {
  const theme = useTheme<Theme>();
  return (
    <div css={noteItemStyles(theme)} onClick={onSelect}>
      <div className="noteItemStyles__pin">
        <IconButton Icon={PinIcon} size={32} />
      </div>
      <div>
        {note.title && <h4>{note.title}</h4>}
        {note.notes && <p>{note.notes}</p>}
      </div>
      <div className="noteItemStyles__toolbar">
        <IconButton Icon={MoreIcon} size={32} />
      </div>
    </div>
  );
};

export default NoteItem;
