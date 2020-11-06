/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'src/app/reducers';
import ListNotes from '../../common/listNotes';
import NewNote from '../../common/newNote';

const homeStyles = css`
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
`;

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const notes = useSelector((state: State) => state.notes.notes);

  return (
    <div css={homeStyles}>
      <NewNote key="new" />
      <ListNotes notes={notes} key="list notes" />
    </div>
  );
};

export default Home;
