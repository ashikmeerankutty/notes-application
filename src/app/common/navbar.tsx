/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../actions/notes';
import { colors } from '../shared/components/themes';

interface NavbarProps {
  setTheme: () => void;
  toggleSidebar: () => void;
}

const navbarStyles = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${colors.neutral5};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const Navbar: React.FC<NavbarProps> = ({
  setTheme,
  toggleSidebar,
}: NavbarProps) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(loadNotes(searchText));
    }
  };

  return (
    <header role="banner" css={navbarStyles}>
      <button type="button" onClick={() => toggleSidebar()}>
        Hamburger
      </button>
      <div>
        <input
          type="search"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          placeholder="Search Notes"
          onKeyDown={onSearch}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          setTheme();
        }}
      >
        Toggle
      </button>
    </header>
  );
};
