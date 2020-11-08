/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { colors } from '../shared/components/themes';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  message?: string;
  detailMessage?: string;
}

const errorStyles = css`
  color: ${colors.red200};
  font-size: 14px;
`;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const message = this.props.message || 'We are sorry, an error occured.';
    const detailMessage =
      this.props.detailMessage || 'Some error occured. Please try again.';
    if (this.state.hasError) {
      return (
        <div>
          <div css={errorStyles}>
            <div>{message}</div>
          </div>
          <div css={errorStyles}>
            <div>{detailMessage}</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
