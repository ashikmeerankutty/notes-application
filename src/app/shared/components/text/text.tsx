/**@jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React, { HTMLAttributes } from 'react';
import { Theme } from '../themes';

const textStyles = (theme: Theme) => css`
  color: ${theme.colors.text};
`;

interface TextProps extends HTMLAttributes<HTMLElement> {
  is?: string;
  children: string;
  extraStyles?: SerializedStyles;
}

export const Text: React.FC<TextProps> = ({
  is = 'p',
  children,
  extraStyles,
}: TextProps) => {
  const theme = useTheme<Theme>();
  return jsx(is, { css: [textStyles(theme), extraStyles] }, children);
};
