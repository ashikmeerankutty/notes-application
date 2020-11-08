/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { BlankIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React, { HTMLAttributes } from 'react';
import { Theme } from '../themes';

const iconButtonStyles = (theme: Theme, active: boolean, size: number) => css`
  background-color: ${active ? theme.colors.primary : theme.colors.background};
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: ${size}px;
  height: ${size}px;
  border-radius: 100%;
  transition: 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transition: 0.3s ease;
    background-color: ${theme.colors.primaryHover};
  }
`;

interface IconButtonProps extends HTMLAttributes<HTMLElement> {
  Icon: typeof BlankIcon;
  active?: boolean;
  size?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  active,
  size = 48,
  ...rest
}: IconButtonProps) => {
  const theme = useTheme<Theme>();
  return (
    <button css={iconButtonStyles(theme, active, size)} {...rest}>
      <Icon
        color={active ? theme.colors.background : theme.colors.primary}
        size={16}
      />
    </button>
  );
};
