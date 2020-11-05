/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const MenuStyles = css`
  border-radius: 5px;
  min-width: 200px;
  max-height: 500px;
  overflow: auto;
`;

interface MenuProps {
  children?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }: MenuProps) => {
  return <div css={MenuStyles}>{children}</div>;
};
