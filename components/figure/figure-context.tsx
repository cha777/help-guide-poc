'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

type FigureRegistry = {
  [label: string]: number;
};

const FigureContext = createContext<{
  increment: (label?: string) => number;
  getFigureNumber: (label: string) => number | undefined;
  version: number;
}>({
  increment: () => 1,
  getFigureNumber: () => undefined,
  version: 0,
});

export function useFigureCounter() {
  const context = useContext(FigureContext);

  if (context === undefined) throw new Error('useFigureCounter must be used within a FigureProvider');

  return context;
}

export function FigureProvider({ children }: { children: React.ReactNode }) {
  const countRef = useRef(0);
  const registryRef = useRef<FigureRegistry>({});
  const [version, setVersion] = useState(0);

  const increment = useCallback((label?: string) => {
    countRef.current += 1;

    if (label) {
      registryRef.current[label] = countRef.current;
      setVersion((v) => v + 1);
    }

    return countRef.current;
  }, []);

  const getFigureNumber = useCallback((label: string) => registryRef.current[label], [registryRef.current]);

  return <FigureContext.Provider value={{ version, increment, getFigureNumber }}>{children}</FigureContext.Provider>;
}
