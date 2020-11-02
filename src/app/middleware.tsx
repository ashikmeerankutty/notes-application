import React, { ReactNode, useState } from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useLoading } from './shared/utils/loadingStates';
import { lightTheme, darkTheme } from 'components';
import { getBrowserTheme, THEMES } from './shared/utils/theme';

const globalStyles = (theme) => css`
  body {
    background: ${theme.colors.background};
  }
`;

type MiddlewareProps = {
  children?: ReactNode;
};

const Middleware: React.FC<MiddlewareProps> = ({ children }: MiddlewareProps) => {
  const [mode, setMode] = useState(getBrowserTheme());
  console.log(mode);
  const loading = useLoading([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const theme = mode === THEMES.light ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <button
        onClick={() => {
          setMode(!mode);
        }}
      >
        Toggle
      </button>
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default Middleware;
