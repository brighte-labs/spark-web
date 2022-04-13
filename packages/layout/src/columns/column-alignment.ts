import { createResponsiveMapFn } from '@spark-web/core';

const alignYLookup = {
  top: 'start',
  center: 'center',
  bottom: 'end',
  stretch: 'stretch',
} as const;

export type AlignY = keyof typeof alignYLookup;

export const alignYToAlignItems = createResponsiveMapFn(alignYLookup);
