/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadSearchResults, clearNotes } from '../actions/notes';
import { Theme } from '../shared/components/themes';
import { debounce } from 'lodash';

const searchInputStyles = (theme: Theme) => css`
  max-width: 300px;
  border: 1px solid ${theme.colors.border};
  outline: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
  font-weight: 500;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

interface SearchbarProps {
  onSearchChange: (searchTex: string) => void;
}

const SearchBar: React.FC<SearchbarProps> = ({ onSearchChange }: SearchbarProps) => {
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  const theme = useTheme<Theme>();

  const loadQueryNotes = (searchText: string) => {
    dispatch(loadSearchResults(searchText));
  };

  const delayedLoadNotes = useCallback(debounce(loadQueryNotes, 100), []);

  useEffect(() => {
    const searchQuery = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    if (searchQuery[0] === 'search' && searchQuery[1] !== searchText) {
      setSearchText(decodeURI(searchQuery[1]));
      onSearchChange(decodeURI(searchQuery[1]));
    }
  }, []);

  useEffect(() => {
    if (searchText) {
      delayedLoadNotes(searchText);
    } else {
      dispatch(clearNotes());
    }
  }, [searchText]);

  return (
    <input
      aria-label="searchbar"
      css={searchInputStyles(theme)}
      type="search"
      value={searchText}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 0) {
          window.location.hash = `search/${e.target.value}`;
          setSearchText(e.target.value);
          onSearchChange(e.target.value);
        } else {
          window.location.hash = '';
          setSearchText('');
          onSearchChange('');
        }
      }}
      placeholder="Search Notes"
    />
  );
};

export default SearchBar;
