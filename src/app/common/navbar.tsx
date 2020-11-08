/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { LightbulbIcon, MenuIcon, MoonIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../actions/notes';
import { IconButton } from '../shared/components/iconButton';
import { Theme } from '../shared/components/themes';
import { THEMES } from '../shared/utils/theme';
import { debounce } from 'lodash';

interface NavbarProps {
  setTheme: () => void;
  toggleSidebar: () => void;
  mode: boolean;
  onSearchChange: (searchTex: string) => void;
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
  background: ${theme.colors.background};
  z-index: 999;
`;

const searchInputStyles = (theme: Theme) => css`
  max-width: 300px;
  border: 1px solid ${theme.colors.border};
  outline: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
  font-weight: 500;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

export const Navbar: React.FC<NavbarProps> = ({
  setTheme,
  toggleSidebar,
  mode,
  onSearchChange,
}: NavbarProps) => {
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  const theme = useTheme<Theme>();

  const loadQueryNotes = (searchText: string) => {
    dispatch(loadNotes(searchText, 1, null, false));
  };

  const delayedLoadNotes = useCallback(debounce(loadQueryNotes, 500), []);

  useEffect(() => {
    const searchQuery = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    if (searchQuery[0] === 'search' && searchQuery[1] !== searchText) {
      setSearchText(searchQuery[1]);
      onSearchChange(searchQuery[1]);
    }
  }, []);

  useEffect(() => {
    if (searchText) {
      delayedLoadNotes(searchText);
    }
  }, [searchText]);

  const themeToggleButton = mode === THEMES.light ? LightbulbIcon : MoonIcon;

  return (
    <header role="banner" css={navbarStyles(theme)}>
      <IconButton key="menuicon" onClick={() => toggleSidebar()} Icon={MenuIcon} />
      <div key="serchinput">
        <input
          css={searchInputStyles(theme)}
          type="search"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value.length > 0) {
              window.location.hash = `search/${e.target.value}`;
              setSearchText(e.target.value);
              onSearchChange(e.target.value);
            } else {
              window.location.hash = '';
              setSearchText('');
              onSearchChange('');
            }
          }}
          placeholder="Search Notes"
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
