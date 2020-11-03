/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import ListNotes from './listNotes';
import NewNote from './newNotes';

const homeStyles = css`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div css={homeStyles}>
      <NewNote key="new" />
      <ListNotes key="list" />
    </div>
  );
};

export default Home;
