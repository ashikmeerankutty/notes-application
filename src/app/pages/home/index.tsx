/**@jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Button } from 'components';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <Button />
    </div>
  );
};

export default Home;
