import type { HeadingProps } from '@spark-web/heading';
import { Heading as SparkHeading } from '@spark-web/heading';
import { HEADER_HEIGHT } from 'components/constants';
import type { ProviderProps } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { HeadingData } from '../../utils/generate-toc';
import {
  IntersectionObserverProvider,
  useEntries,
  useObserve,
} from './intersection-observer';

const TocContext = createContext<HeadingData[] | undefined>(undefined);

export const TocContextProvider = (props: ProviderProps<HeadingData[]>) => (
  <IntersectionObserverProvider
    options={{ rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` }}
  >
    <TocContext.Provider {...props} />
  </IntersectionObserverProvider>
);

export const useTocContext = (): {
  headings: HeadingData[];
} => {
  const context = useContext(TocContext);
  if (typeof context === 'undefined') {
    throw new Error('useTocContext must be used within a TocContextProvider');
  }
  return { headings: context };
};

export const Heading = (props: HeadingProps) => {
  const context = useContext(TocContext);
  if (typeof context === 'undefined') {
    throw new Error('Heading must be used within a TocContextProvider');
  }
  const { ref } = useObserve<HTMLHeadingElement>();
  return <SparkHeading ref={ref} {...props} />;
};

export const useIsActive = (id: string) => {
  const context = useContext(TocContext);
  if (typeof context === 'undefined') {
    throw new Error('useIsActive must be used within a TocContextProvider');
  }
  const entries = useEntries();

  const activeId = useMemo(() => {
    const intersectingIds = entries
      .filter(entry => entry.isIntersecting)
      .map(entry => entry.target.id);

    const findActiveId = (headings: HeadingData[]): string =>
      headings.reduce((activeId, heading) => {
        if (activeId) return activeId;
        if (intersectingIds.includes(heading.id)) return heading.id;
        return findActiveId(heading.items);
      }, '');

    return findActiveId(context);
  }, [context, entries]);

  return id === activeId;
};
