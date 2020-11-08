/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { ArchiveIcon, DocumentIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Theme, Text } from 'components';

const sidebarStyles = (theme: Theme) => css`
  position: sticky;
  left: 0;
  top: 64px;
  height: calc(100vh - 64px);
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  @media (max-width: 425px) {
    position: static;
  }
`;

const navbarStyles = (expanded: boolean, theme: Theme) => css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: ${theme.colors.background};
  .navbar__wrapper {
    border-right: 1px solid ${theme.colors.border};
    height: 100%;
    padding-bottom: 30px;
    padding-top: 24px;
    width: ${expanded ? '100%' : '64px'};
    transition: 0.3s ease;
    background: ${theme.colors.background};
    .navbarStyles__item {
      display: flex;
      flex-direction: column;
      width: 100%;
      .navItem__active {
        background: ${theme.colors.primaryHover};
      }
    }
    &:hover {
      width: 100%;
    }
    @media (max-width: 425px) {
      overflow: hidden;
      width: ${expanded ? '100%' : 0};
    }
  }
  @media (max-width: 425px) {
    position: fixed;
    z-index: 99;
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

  const path = window.location.pathname.replace('/', '');

  return (
    <div css={sidebarStyles(theme)}>
      <nav
        css={navbarStyles(expanded, theme)}
        role="navigation"
        aria-label="sidebar"
      >
        <div className="navbar__wrapper">
          <div className="navbarStyles__item">
            <div
              onClick={() => history.push('/')}
              css={navItem}
              className={`${path === '' ? 'navItem__active' : ''}`}
            >
              <div className="navItem__icon">
                <DocumentIcon color={theme.colors.text} size={16} />
              </div>
              <Text>Notes</Text>
            </div>
            {/* <div
              onClick={() => history.push('/pins')}
              css={navItem}
              className={`${path === 'pins' ? 'navItem__active' : ''}`}
            >
              <div className="navItem__icon">
                <PinIcon color={theme.colors.text} size={16} />
              </div>
              <p>Pins</p>
            </div> */}
            <div
              onClick={() => history.push('/archives')}
              css={navItem(theme)}
              className={`${path === 'archives' ? 'navItem__active' : ''}`}
            >
              <div className="navItem__icon">
                <ArchiveIcon color={theme.colors.text} size={16} />
              </div>
              <Text>Archived</Text>
            </div>
            {/* <div
              onClick={() => history.push('/trash')}
              css={navItem(theme)}
              className={`${path === 'trash' ? 'navItem__active' : ''}`}
            >
              <div className="navItem__icon">
                <TrashIcon color={theme.colors.text} size={16} />
              </div>
              <p>Trash</p>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
