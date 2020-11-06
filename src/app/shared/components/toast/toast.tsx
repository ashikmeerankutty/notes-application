/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { InfoSignIcon, TickCircleIcon, WarningSignIcon } from '@space-kit/icons';
import React from 'react';
import { colors } from '../themes';

type ToastType = {
  color: string;
  icon: React.ReactNode;
};

type ToastTypes = {
  [key: string]: ToastType;
  info: ToastType;
  error: ToastType;
  success: ToastType;
};

const types: ToastTypes = {
  info: {
    color: '#1070CA',
    icon: <InfoSignIcon color="#1070CA" size={16} />,
  },
  error: {
    color: '#EC4C47',
    icon: <WarningSignIcon color="#EC4C47" size={16} />,
  },
  success: {
    color: '#4CB881',
    icon: <TickCircleIcon color="#4CB881" size={16} />,
  },
};

const toastStyles = (type: string) => css`
  background: ${colors.white};
  box-shadow: rgba(67, 90, 111, 0.3) 0px 0px 1px,
    rgba(67, 90, 111, 0.47) 0px 8px 10px -4px;
  margin-top: 10px;
  padding: 10px 30px;
  width: 100%;
  z-index: 9999;
  color: ${colors.neutral9};
  display: flex;
  border-left: 3px solid ${types[type].color};
  font-weight: 500;
  .iconStyles {
    padding-right: 10px;
  }
`;

interface ToastProps {
  type: string;
  children: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({ type, children }: ToastProps) => {
  return (
    <div css={toastStyles(type)}>
      <div className="iconStyles">{types[type].icon}</div>
      {children}
    </div>
  );
};
