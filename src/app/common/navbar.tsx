/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { colors } from '../shared/components/themes';

interface NavbarProps {
  setTheme: () => void;
  toggleSidebar: () => void;
}

const navbarStyles = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${colors.neutral5};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const Navbar: React.FC<NavbarProps> = ({
  setTheme,
  toggleSidebar,
}: NavbarProps) => {
  return (
    <header role="banner" css={navbarStyles}>
      <button type="button" onClick={() => toggleSidebar()}>
        Hamburger
      </button>
      <button
        type="button"
        onClick={() => {
          setTheme();
        }}
      >
        Toggle
      </button>
    </header>
  );
};
