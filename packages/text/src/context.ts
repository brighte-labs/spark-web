import { createContext, useContext } from 'react';

import type { useDefaultTextProps } from './defaultTextProps';

type TextContextType = ReturnType<typeof useDefaultTextProps>;

export const TextContext = createContext<TextContextType | undefined>(
  undefined
);

export function useTextContext() {
  return useContext(TextContext);
}
