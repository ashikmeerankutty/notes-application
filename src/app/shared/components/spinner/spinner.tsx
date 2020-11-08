/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const baseStyles = (size: number) => css`
  display: inline-block;
  width: ${size / 2}px;
  height: ${size}px;
  padding-left: ${size / 2}px;
  > div {
    width: ${size / 2}px;
    height: ${size / 2}px;
    border-top-right-radius: 30px;
    border: 2px solid #000;
    border-left: 0;
    border-bottom: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    animation: spin 1s linear infinite;
    transform-origin: 0% 100%;
    @-moz-keyframes spin {
      100% {
        -moz-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
`;

interface SpinnerProps {
  size: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ size }: SpinnerProps) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div css={baseStyles(size)}>
        <div />
      </div>
    </div>
  );
};
