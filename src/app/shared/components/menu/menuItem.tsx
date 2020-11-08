/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../themes';

const MenuItemStyles = (theme: Theme) => css`
  display: flex;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.6px;
  background: ${theme.colors.background};
  &:hover {
    cursor: pointer;
    background: ${theme.colors.primaryHover};
  }
`;

interface MenuItemProps {
  onSelect: () => void;
  children: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  onSelect,
  children,
}: MenuItemProps) => {
  const theme = useTheme<Theme>();
  return (
    <div css={MenuItemStyles(theme)} onClick={onSelect}>
      {children}
    </div>
  );
};
