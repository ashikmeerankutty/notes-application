/**@jsx jsx */
import { jsx } from '@emotion/core';
import React, { ReactNode, useState } from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useLoading } from './shared/utils/loadingStates';
import { lightTheme, darkTheme, Toast } from 'components';
import { getBrowserTheme, THEMES } from './shared/utils/theme';
import { Theme, ToastManager } from 'components';
import { Navbar, Sidebar } from './common';
import { useSelector } from 'react-redux';
import { State } from './reducers';
import SearchPage from './pages/search';
import ErrorBoundary from './common/error';

const globalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
  body {
    margin: 0;
    padding: 0;
    background: ${theme.colors.background};
    font-family: 'Roboto', sans-serif;
  }
  body,
  input,
  textarea {
    font-family: 'Roboto', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding: 0;
    margin: 0;
    word-wrap: break-word;
  }
`;

const containerStyles = css`
  margin-top: 64px;
  display: flex;
`;

interface MiddlewareProps {
  children?: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }: MiddlewareProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mode, setMode] = useState(!getBrowserTheme());
  const [searchText, setSearchText] = useState('');
  const loading = useLoading([]);
  const toasts = useSelector((state: State) => state.globals.toastStates);
  if (loading) {
    return <div>Loading...</div>;
  }

  const theme = mode === THEMES.light ? lightTheme : darkTheme;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        <Navbar
          toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
          setTheme={() => setMode(!mode)}
          onSearchChange={(searchText: string) => setSearchText(searchText)}
          mode={mode}
        ></Navbar>
        <div role="main" css={containerStyles}>
          <Sidebar expanded={sidebarExpanded} />
          {searchText ? <SearchPage /> : children}
        </div>
        <ToastManager>
          {toasts.map((toast) => (
            <Toast key={toast.id} type={toast.state}>
              {toast.message}
            </Toast>
          ))}
        </ToastManager>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Middleware;
