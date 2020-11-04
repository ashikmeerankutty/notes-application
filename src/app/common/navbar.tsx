/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { LightbulbIcon, MenuIcon, MoonIcon } from '@space-kit/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../actions/notes';
import { IconButton } from '../shared/components/iconButton';
import { colors } from '../shared/components/themes';
import { THEMES } from '../shared/utils/theme';

interface NavbarProps {
  setTheme: () => void;
  toggleSidebar: () => void;
  mode: boolean;
}

const navbarStyles = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${colors.neutral5};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
`;

export const Navbar: React.FC<NavbarProps> = ({
  setTheme,
  toggleSidebar,
  mode,
}: NavbarProps) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(loadNotes(searchText));
    }
  };

  const themeToggleButton = mode === THEMES.light ? MoonIcon : LightbulbIcon;

  return (
    <header role="banner" css={navbarStyles}>
      <IconButton onClick={() => toggleSidebar()} Icon={MenuIcon} />
      <div>
        <input
          type="search"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          placeholder="Search Notes"
          onKeyDown={onSearch}
        />
      </div>
      <IconButton onClick={() => setTheme()} Icon={themeToggleButton} />
    </header>
  );
};
