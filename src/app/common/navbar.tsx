/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { LightbulbIcon, MenuIcon, MoonIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { IconButton } from '../shared/components/iconButton';
import { Theme } from '../shared/components/themes';
import { THEMES } from '../shared/utils/theme';
import SearchBar from './searchbar';

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

export const Navbar: React.FC<NavbarProps> = ({
  setTheme,
  toggleSidebar,
  mode,
  onSearchChange,
}: NavbarProps) => {
  const themeToggleButton = mode === THEMES.light ? LightbulbIcon : MoonIcon;

  const theme = useTheme<Theme>();

  return (
    <header role="banner" css={navbarStyles(theme)}>
      <IconButton key="menuicon" onClick={() => toggleSidebar()} Icon={MenuIcon} />
      <div>
        <SearchBar onSearchChange={onSearchChange} />
      </div>
      <IconButton
        key="themeicon"
        onClick={() => setTheme()}
        Icon={themeToggleButton}
      />
    </header>
  );
};
