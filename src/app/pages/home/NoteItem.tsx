/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { MoreIcon, PinIcon } from '@space-kit/icons';
import { IconButton, Menu, MenuGroup, MenuItem, Popover, Theme } from 'components';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { Note } from 'src/app/shared/db/types';

const noteItemStyles = (theme: Theme, showMenu: boolean) => css`
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
    opacity: ${showMenu ? 1 : 0};
    transition: opacity 0.5s;
  }
  .noteItemStyles__toolbar {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    opacity: ${showMenu ? 1 : 0};
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
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme<Theme>();
  return (
    <div css={noteItemStyles(theme, showMenu)}>
      <div className="noteItemStyles__pin">
        <IconButton Icon={PinIcon} size={32} />
      </div>
      <div onClick={onSelect}>
        {note.title && <h4>{note.title}</h4>}
        {note.notes && <p>{note.notes}</p>}
      </div>
      <div className="noteItemStyles__toolbar">
        <Popover
          onClose={() => setShowMenu(false)}
          show={showMenu}
          width={200}
          content={
            <Menu>
              <MenuGroup title="Options">
                <MenuItem
                  onSelect={() => {
                    setShowMenu(true);
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  onSelect={() => {
                    setShowMenu(true);
                  }}
                >
                  Archive
                </MenuItem>
              </MenuGroup>
            </Menu>
          }
        >
          <IconButton
            active={showMenu}
            onClick={() => setShowMenu(true)}
            Icon={MoreIcon}
            size={32}
          />
        </Popover>
      </div>
    </div>
  );
};

export default NoteItem;
