/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { BlankIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';
import React, { HTMLAttributes } from 'react';
import { Theme } from '../themes';

const iconButtonStyles = (theme: Theme) => css`
  background-color: ${theme.colors};
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
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
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  ...rest
}: IconButtonProps) => {
  const theme = useTheme<Theme>();
  return (
    <button css={iconButtonStyles(theme)} {...rest}>
      <Icon color={theme.colors.text} size={16} />
    </button>
  );
};
