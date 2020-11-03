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

const navbarStyles = (expanded: boolean) => css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 24px;
  width: ${expanded ? '100%' : '64px'};
`;

const navItemsStyles = (expanded: boolean) => css`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: ${expanded ? '100%' : '48px'};
`;

const navItem = css`
  display: flex;
  overflow: hidden;
`;

interface SidebarProps {
  expanded: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ expanded }: SidebarProps) => {
  const theme = useTheme<Theme>();

  return (
    <div css={sidebarStyles(theme)}>
      <nav css={navbarStyles(expanded)} role="navigation" aria-label="sidebar">
        <div css={navItemsStyles(expanded)}>
          <div css={navItem} key="notes">
            <p>icon</p>
            <p>Notes</p>
          </div>
          <div css={navItem} key="archived">
            <p>icon</p>
            <p>Archived</p>
          </div>
          <div css={navItem} key="trash">
            <p>icon</p>
            <p>Trash</p>
          </div>
        </div>
      </nav>
    </div>
  );
};
