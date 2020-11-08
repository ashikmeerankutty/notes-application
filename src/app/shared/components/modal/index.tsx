/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useCallback, useRef } from 'react';
import { colors, Portal, Theme } from 'components';
import { IconButton } from '../iconButton';
import { CrossIcon } from '@space-kit/icons';
import { useTheme } from 'emotion-theming';

const wrapperStyles = css`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(67, 90, 111, 0.7);
  justify-content: center;
  align-items: flex-start;
`;

const modalStyles = (width: number = 600, theme: Theme) => css`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
  margin-top: 150px;
  width: ${width}px;
  border-radius: 5px;
  max-height: calc(100% - 300px);
`;

const contentStyles = (padding: number = 20) => css`
  padding: ${padding}px;
  overflow: auto;
`;

const headerStyles = () => css`
  padding: 16px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  .headerStyles__text {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  border-bottom: 1px solid ${colors.neutral4};
`;

const footerStyles = () => css`
  padding: 16px;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  border-top: 1px solid ${colors.neutral4};
`;

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
  width?: number;
  padding?: number;
  onClose: () => void;
  header?: boolean;
  headerText?: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  show,
  children,
  width,
  padding,
  onClose,
  header,
  headerText,
}: ModalProps) => {
  const targetRef = useRef(null);

  const theme = useTheme<Theme>();

  const handleBodyClick = useCallback(
    (event) => {
      if (targetRef.current && targetRef.current.contains(event.target)) {
        return;
      }
      onClose();
    },
    [targetRef.current, onClose]
  );

  const handleOnEsc = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (show) {
      document.body.addEventListener('click', handleBodyClick, false);
      document.body.addEventListener('keydown', handleOnEsc, false);
    } else {
      document.body.removeEventListener('click', handleBodyClick, false);
      document.body.removeEventListener('keydown', handleOnEsc, false);
    }
    return () => {
      document.body.removeEventListener('click', handleBodyClick, false);
      document.body.removeEventListener('keydown', handleOnEsc, false);
    };
  }, [show]);

  return (
    <div>
      {show && (
        <Portal>
          <div css={wrapperStyles}>
            <div ref={targetRef} css={modalStyles(width, theme)}>
              {header && (
                <div css={headerStyles}>
                  <p className="headerStyles__text">{headerText}</p>
                  <IconButton onClick={() => onClose()} Icon={CrossIcon} />
                </div>
              )}
              <div css={contentStyles(padding)}>
                <div>{children}</div>
              </div>
              {header && (
                <div css={footerStyles}>
                  <button>Submit</button>
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
