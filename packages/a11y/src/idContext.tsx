// Implementation heavily inspired by react-aria's:
// See: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/ssr/src/SSRProvider.tsx

// Replace with React core `useId` when appropriate:
// See: https://github.com/reactwg/react-18/discussions/111

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

type IdContextValue = {
  prefix: number;
  current: number;
};

const defaultIdContext: IdContextValue = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0,
};

const IdContext = createContext<IdContextValue>(defaultIdContext);

/** Provide stable IDs in server rendered environments. */
export function IdProvider({ children }: { children: ReactNode }) {
  const currentContext = useContext(IdContext);
  const isRootIdProvider = currentContext === defaultIdContext;
  const context: IdContextValue = useMemo(
    () => ({
      prefix: isRootIdProvider ? 0 : ++currentContext.prefix,
      current: 0,
    }),
    [isRootIdProvider, currentContext]
  );

  return <IdContext.Provider value={context}>{children}</IdContext.Provider>;
}

// Utils
// ------------------------------

/** Generate a unique ID. */
export function useId(deterministicId?: string): string {
  const context = useContext(IdContext);
  const isBrowser = Boolean(globalThis?.document);

  if (!isBrowser && context === defaultIdContext) {
    // eslint-disable-next-line no-console
    console.warn(
      'When server rendering, you must wrap your application in an <IdProvider> to ensure consistent IDs are generated between the client and server.'
    );
  }

  return useMemo(
    () =>
      deterministicId || `brighte-id-${context.prefix}-${++context.current}`,
    [context, deterministicId]
  );
}

/** Format IDs for compound components. */
export function composeId(...args: (string | number | null | undefined)[]) {
  return args.filter(val => val != null).join('--');
}

export function mergeIds(...ids: Array<string | undefined>) {
  const validIds = ids.filter(Boolean);

  if (validIds.length === 0) {
    return undefined;
  }

  return validIds.join(' ');
}
