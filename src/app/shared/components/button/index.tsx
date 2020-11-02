/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Theme } from '../themes';

const buttonStyles = (theme: Theme) => css`
  background: ${theme.colors.primary};
`;

interface ButtonProps {}

export const Button: React.FC<ButtonProps> = () => {
  const theme = useTheme<Theme>();
  return <button css={buttonStyles(theme)}>Hello</button>;
};
