/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import ListNotes from '../../common/listNotes';
import { State } from '../../reducers';
import { Text } from 'components';

const SearchPage: FunctionComponent = () => {
  const notes = useSelector((state: State) => state.notes.notes);
  const searchPageStyles = css`
    padding: 30px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: center;
  `;

  const headingStyles = css`
    margin-top: 40px;
  `;
  return (
    <div css={searchPageStyles}>
      <Text extraStyles={headingStyles} is="h4">
        Search results
      </Text>
      <ListNotes notes={notes} key="list notes" />
    </div>
  );
  return <div></div>;
};

export default SearchPage;
