import { createResponsiveMapFn } from '@spark-web/theme';

const alignLookup = { left: 'start', center: 'center', right: 'end' } as const;
const alignYLookup = { top: 'start', center: 'center', bottom: 'end' } as const;

export type Align = keyof typeof alignLookup;
export type AlignY = keyof typeof alignYLookup;

export const alignToJustifyContent = createResponsiveMapFn(alignLookup);
export const alignYToAlignItems = createResponsiveMapFn(alignYLookup);
