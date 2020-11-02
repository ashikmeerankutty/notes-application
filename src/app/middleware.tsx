import React, { FunctionComponent, ReactNode } from 'react';
import { useLoading } from './shared/utils/loadingStates';

type MiddlewareProps = {
  children?: ReactNode;
};

const Middleware: FunctionComponent<MiddlewareProps> = ({
  children,
}: MiddlewareProps) => {
  const loading = useLoading([]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default Middleware;
