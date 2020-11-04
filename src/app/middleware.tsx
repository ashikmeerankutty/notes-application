/**@jsx jsx */
import { jsx } from '@emotion/core';
import React, { ReactNode, useState } from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useLoading } from './shared/utils/loadingStates';
import { lightTheme, darkTheme } from 'components';
import { getBrowserTheme, THEMES } from './shared/utils/theme';
import { Theme } from 'components';
import { Navbar, Sidebar } from './common';

const globalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
  body {
    margin: 0;
    padding: 0;
    background: ${theme.colors.background};
    font-family: 'Roboto', sans-serif;
  }
  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const containerStyles = css`
  margin-top: 64px;
  margin-left: 64px;
`;

interface MiddlewareProps {
  children?: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }: MiddlewareProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mode, setMode] = useState(!getBrowserTheme());
  const loading = useLoading([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const theme = mode === THEMES.light ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <Navbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        setTheme={() => setMode(!mode)}
        mode={mode}
      ></Navbar>
      <Sidebar expanded={sidebarExpanded} />
      <div role="main" css={containerStyles}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Middleware;
