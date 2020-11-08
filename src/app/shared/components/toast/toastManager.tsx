/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Portal } from 'components';
import React from 'react';

interface ToastManagerProps {
  children?: React.ReactNode;
}

const toastManagerStyles = css`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

export const ToastManager: React.FC<ToastManagerProps> = ({
  children,
}: ToastManagerProps) => {
  return (
    <Portal>
      <div css={toastManagerStyles}>{children}</div>
    </Portal>
  );
};
