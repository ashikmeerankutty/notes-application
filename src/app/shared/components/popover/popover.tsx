/**@jsx jsx */
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Portal, Theme } from 'components';
import { useTheme } from 'emotion-theming';

const PopoverStyles = (
  theme: Theme,
  position: Positon,
  width: number,
  height: number
) => css`
  position: fixed;
  top: ${position.top + 10}px;
  left: ${position.left}px;
  transform: translate(-20%, 0);
  min-width: 100px;
  overflow: auto;
  width: 100%;
  max-width: ${width ? width + 'px' : '100%'};
  max-height: ${height ? height + 'px' : 'auto'};
  box-shadow: rgba(67, 90, 111, 0.3) 0px 0px 1px,
    rgba(67, 90, 111, 0.47) 0px 8px 10px -4px;
  border-radius: 5px;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

const PopoverWrapperStyles = css`
  display: flex;
`;

const PopoverChildrenStyles = css`
  width: 100%;
  height: 100%;
`;

interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  show: boolean;
  onClose?: () => void;
  width?: number;
  height?: number;
}

type Positon = {
  left: number;
  top: number;
};

export const Popover: React.FC<PopoverProps> = ({
  children,
  show,
  onClose,
  content,
  width,
  height,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const targetRef = useRef(null);
  const contentRef = useRef(null);
  const [position, setPosition] = useState<Positon>({
    left: 0,
    top: 0,
  });

  const theme = useTheme<Theme>();

  useEffect(() => {
    if (show === isOpen) {
      update();
      return;
    }
    if (show) {
      open();
    } else {
      close();
    }
  }, [isOpen, show]);

  const close = () => {
    if (!isOpen) {
      return;
    }
    setIsOpen(false);
    onClose();
  };

  const open = () => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    update();
  };

  const handleBodyClick = useCallback(
    (event) => {
      if (targetRef.current && targetRef.current.contains(event.target)) {
        return;
      }
      if (contentRef.current && contentRef.current.contains(event.target)) {
        return;
      }
      close();
    },
    [targetRef.current, close]
  );

  const update = () => {
    if (!targetRef.current) {
      return;
    }
    const { x, y, width, height } = targetRef.current.getBoundingClientRect();
    setPosition({
      left: x + width,
      top: y + height,
    });
  };

  const handleOnEsc = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  return (
    <div css={PopoverWrapperStyles}>
      <div css={PopoverChildrenStyles} ref={targetRef}>
        {children}
      </div>
      {isOpen && (
        <Portal>
          <div css={PopoverStyles(theme, position, width, height)} ref={contentRef}>
            {content}
          </div>
        </Portal>
      )}
    </div>
  );
};
