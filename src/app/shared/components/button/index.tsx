/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Theme } from '../themes';

const buttonStyles = (theme: Theme) => css`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  transition: 0.5s ease;
  cursor: pointer;
  color: ${theme.colors.text};
  &:hover {
    background: ${theme.colors.primaryHover};
    transition: 0.5s ease;
  }
  &:focus {
    outline: none;
  }
`;

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
}: ButtonProps) => {
  const theme = useTheme<Theme>();
  return (
    <button onClick={onClick} css={buttonStyles(theme)}>
      {children}
    </button>
  );
};
