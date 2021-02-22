import { ReactNode } from 'react';
import { ApiProvider } from './ApiContext';

interface Props {
  children: ReactNode;
}

export function AppContext({ children }: Props) {
  return (
    <ApiProvider>
      {children}
    </ApiProvider>
  );
}