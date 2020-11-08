/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Text } from 'components';

interface EmptyBlockProps {
  description: string;
}
const emptyBlockStyles = css`
  display: flex;
  padding-top: 20px;
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: lighter;
`;

export const EmptyBlock: React.FC<EmptyBlockProps> = ({
  description,
}: EmptyBlockProps) => {
  return (
    <div css={emptyBlockStyles}>
      <Text>{description}</Text>
    </div>
  );
};
