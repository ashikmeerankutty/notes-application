/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Theme } from '../shared/components/themes';

const sidebarStyles = (theme: Theme) => css`
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  z-index: 200;
  margin: 0;
  padding: 0;
  height: calc(100vh - 64px);
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

const navbarStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 24px;
  width: 64px;
`;

const navIconStyles = css`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
`;

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme<Theme>();

  return (
    <div css={sidebarStyles(theme)}>
      <nav css={navbarStyles} role="navigation" aria-label="sidebar">
        <div css={navIconStyles}>
          <a key="notes">Notes</a>
          <a key="archived">Archived</a>
        </div>
      </nav>
    </div>
  );
};
