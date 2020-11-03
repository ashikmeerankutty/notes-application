/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React, { HTMLAttributes } from 'react';
import { Theme } from '../themes';

const iconButtonStyles = (theme: Theme) => css`
  background: ${theme.colors.text};
`;

interface IconButtonProps extends HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ...rest
}: IconButtonProps) => {
  const theme = useTheme<Theme>();
  return (
    <button css={iconButtonStyles(theme)} {...rest}>
      {icon}
    </button>
  );
};
