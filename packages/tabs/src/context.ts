import { createContext, useContext } from 'react';

const IndexContext = createContext(0);

export const IndexProvider = IndexContext.Provider;

export function useIndexContext() {
  const index = useContext(IndexContext);
  // Radix UI requires that the `value` prop for Tab and TabPanel be a string
  return String(index);
}

export type IndexContextType = ReturnType<typeof useIndexContext>;
