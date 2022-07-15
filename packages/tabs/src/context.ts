import { createContext, useContext } from 'react';

const IndexContext = createContext(0);

export const IndexProvider = IndexContext.Provider;

export function useIndexContext(indexProp: number | undefined) {
  const count = useContext(IndexContext);
  const index = indexProp ?? count;
  // the `value` prop for Tab and TabPanel must be a string
  return String(index);
}

export type IndexContextType = ReturnType<typeof useIndexContext>;
