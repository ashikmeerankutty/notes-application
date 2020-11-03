import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
  const [portalNode] = useState(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      document.body.removeChild(portalNode);
    };
  }, []);

  return createPortal(children, portalNode);
};
