/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';

const buttonStyles = (theme) => css`
  background: ${theme.colors.primary};
`;

interface ButtonProps {}

export const Button: React.FC<ButtonProps> = () => {
  const theme = useTheme();
  console.log(theme);
  return <button css={buttonStyles(theme)}>Hello</button>;
};
