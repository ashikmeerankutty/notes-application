/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  message?: string;
  detailMessage?: string;
}

const errorStyles = css`
  color: red;
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
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
