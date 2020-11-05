/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { ArchiveIcon, DocumentIcon, PinIcon, TrashIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from '../shared/components/themes';

const sidebarStyles = (theme: Theme) => css`
  height: calc(100vh - 64px);
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

const navbarStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 24px;
  width: '100%';
`;

const navItemsStyles = (expanded: boolean) => css`
  display: flex;
  flex-direction: column;
  width: ${expanded ? '100%' : '64px'};
  &:hover {
    width: 100%;
  }
`;

const navItem = (theme: Theme) => css`
  display: flex;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 30px;
  align-items: center;
  border-radius: 0px 25px 25px 0px;
  .navItem__icon {
    padding: 15px 30px 15px 10px;
  }
  transition: 0.3s ease;
  &:hover {
    transition: 0.3s ease;
    background: ${theme.colors.primaryHover};
  }
`;

interface SidebarProps {
  expanded: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ expanded }: SidebarProps) => {
  const history = useHistory();
  const theme = useTheme<Theme>();

  return (
    <div css={sidebarStyles(theme)}>
      <nav css={navbarStyles} role="navigation" aria-label="sidebar">
        <div css={navItemsStyles(expanded)}>
          <div onClick={() => history.push('/')} css={navItem(theme)} key="notes">
            <div className="navItem__icon">
              <DocumentIcon color={theme.colors.text} size={16} />
            </div>
            <p>Notes</p>
          </div>
          <div onClick={() => history.push('/pins')} css={navItem(theme)} key="pins">
            <div className="navItem__icon">
              <PinIcon color={theme.colors.text} size={16} />
            </div>
            <p>Pins</p>
          </div>
          <div
            onClick={() => history.push('/archives')}
            css={navItem(theme)}
            key="archived"
          >
            <div className="navItem__icon">
              <ArchiveIcon color={theme.colors.text} size={16} />
            </div>
            <p>Archived</p>
          </div>
          <div
            onClick={() => history.push('/trash')}
            css={navItem(theme)}
            key="trash"
          >
            <div className="navItem__icon">
              <TrashIcon color={theme.colors.text} size={16} />
            </div>
            <p>Trash</p>
          </div>
        </div>
      </nav>
    </div>
  );
};
