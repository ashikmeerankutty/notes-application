/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const MenuItemStyles = css`
  display: flex;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.6px;
  &:hover {
    cursor: pointer;
    background: rgba(67, 90, 111, 0.04);
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
  return (
    <div css={MenuItemStyles} onClick={onSelect}>
      {children}
    </div>
  );
};
