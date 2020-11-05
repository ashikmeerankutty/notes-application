/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../themes';

const MenuGroupTitleStyle = (theme: Theme) => css`
  margin: 8px 16px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
  color: ${theme.colors.text};
`;

const MenuGroupStyle = css`
  padding: 8px 0px;
`;

interface MenuGroupProps {
  title: string;
  children?: React.ReactNode;
}

export const MenuGroup: React.FC<MenuGroupProps> = ({
  title,
  children,
}: MenuGroupProps) => {
  const theme = useTheme<Theme>();
  return (
    <div css={MenuGroupStyle}>
      <h4 css={MenuGroupTitleStyle(theme)}>{title}</h4>
      {children}
    </div>
  );
};
