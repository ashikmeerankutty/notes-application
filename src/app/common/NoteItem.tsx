/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { MoreIcon, PinIcon } from '@space-kit/icons';
import { IconButton, Menu, MenuGroup, MenuItem, Popover, Theme } from 'components';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../actions/globals';
import { deleteNote, archiveNote, pinNote } from '../actions/notes';
import { Note } from '../shared/db/types';
import ErrorBoundary from './error';
import Markdown from './markdown';

const noteItemStyles = (theme: Theme, showMenu: boolean) => css`
  position: relative;
  width: 250px;
  height: 120px;
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

const noteDetailStyles = css`
  height: 100%;
  cursor: pointer;
  overflow: scroll;
`;

interface NoteItemProps {
  note: Note;
  onSelect: () => void;
  search: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onSelect,
  search,
}: NoteItemProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const theme = useTheme<Theme>();
  return (
    <div css={noteItemStyles(theme, showMenu)}>
      <div className="noteItemStyles__pin">
        <IconButton
          active={note.pinned}
          onClick={() => {
            dispatch(pinNote(note.id, note.pinned, search));
            dispatch(
              showToast('success', note.pinned ? 'Note Unpinned' : 'Note Pinned')
            );
          }}
          Icon={PinIcon}
          size={32}
        />
      </div>
      <div css={noteDetailStyles} onClick={onSelect}>
        {note.title && <h4>{note.title}</h4>}
        {note.notes && (
          <ErrorBoundary
            message="Error rendering markdown"
            detailMessage="Some error occured while rendering markdown. Please check your markdown for any errors"
          >
            <Markdown text={note.notes}></Markdown>
          </ErrorBoundary>
        )}
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
                    dispatch(deleteNote(note.id));
                    dispatch(showToast('error', 'Note deleted'));
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  onSelect={() => {
                    dispatch(archiveNote(note.id, note.archived));
                    dispatch(
                      showToast(
                        'success',
                        note.archived ? 'Note Unarchived' : 'Note Archived'
                      )
                    );
                  }}
                >
                  {note.archived ? 'Unarchive' : 'Archive'}
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
