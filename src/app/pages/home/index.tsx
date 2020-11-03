/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from 'src/app/reducers';
import ListNotes from './listNotes';
import Markdown from './markdown';
import NewNote from './newNotes';

const homeStyles = css`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [selectedNoteId, setSelectedNoteId] = useState({});
  const notes = useSelector((state: State) => state.notes.notes);

  const selectedNote = useMemo(() => {
    return notes.find((note) => note.id === selectedNoteId);
  }, [selectedNoteId]);

  return (
    <div css={homeStyles}>
      <NewNote key="new" />
      <ListNotes
        setSelectedNote={(id: string) => setSelectedNoteId(id)}
        notes={notes}
        key="list notes"
      />
      {selectedNote && <Markdown text={selectedNote.notes} />}
    </div>
  );
};

export default Home;
