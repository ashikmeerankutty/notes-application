/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { LightbulbIcon, MenuIcon, MoonIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../actions/notes';
import { IconButton } from '../shared/components/iconButton';
import { Theme } from '../shared/components/themes';
import { THEMES } from '../shared/utils/theme';

interface NavbarProps {
  setTheme: () => void;
  toggleSidebar: () => void;
  mode: boolean;
}

const navbarStyles = (theme: Theme) => css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${theme.colors.border};
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

  const theme = useTheme<Theme>();

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(loadNotes(searchText));
    }
  };

  const themeToggleButton = mode === THEMES.light ? LightbulbIcon : MoonIcon;

  return (
    <header role="banner" css={navbarStyles(theme)}>
      <IconButton key="menuicon" onClick={() => toggleSidebar()} Icon={MenuIcon} />
      <div key="serchinput">
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
      <IconButton
        key="themeicon"
        onClick={() => setTheme()}
        Icon={themeToggleButton}
      />
    </header>
  );
};
