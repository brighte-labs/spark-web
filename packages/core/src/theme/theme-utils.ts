import type { CSSObject } from '@emotion/css';
import facepaint from 'facepaint';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

import type { Breakpoint } from './breakpoints';
import { breakpointNames, breakpoints } from './breakpoints';

type RequiredTokens = { breakpoint: Record<Breakpoint, number> };
type ResponsiveObject<T> = Partial<Record<Breakpoint, T>>;

export type ResponsiveProp<T> = T | ResponsiveObject<T>;

/**
 * Utilities related to responsive props. Emotion's
 * [facepaint](https://github.com/emotion-js/facepaint) ultimately generates
 * media queries for the resolved styles.
 */
export const makeThemeUtils = ({ breakpoint }: RequiredTokens) => {
  // NOTE: the `mobile` key is used to represent "below tablet" in certain
  // cases, but it SHOULD NOT create a media query: facepaint will apply the
  // first property in the array without a query.
  const validBreakpoints = Object.values(breakpointQuery);

  return {
    mapResponsiveProp,
    mapResponsiveScale,
    optimizeResponsiveArray,
    responsiveRange,
    responsiveStyles,
    resolveResponsiveProps: facepaint(validBreakpoints),
  };
};

// Responsive props
// ------------------------------

/**
 * Helper for mapping keys/breakpoint map to a theme scale e.g.
 *
 * @example
 * mapResponsiveProp('small', { small: 8, large: 16 }) // 8
 * mapResponsiveProp(
 *   { mobile:'small', tablet:'large' },
 *   { small: 8, large: 16 }
 * ) // [8,16]
 */

export const mapResponsiveScale = <
  KeyOrBreakpointMap extends keyof ScaleDefinition,
  ScaleDefinition
>(
  value: ResponsiveProp<KeyOrBreakpointMap> | undefined,
  scaleDefinition: ScaleDefinition
) => {
  if (value === undefined) {
    return value;
  }

  if (typeof value === 'object') {
    return resolveResponsiveScale(value, scaleDefinition);
  }

  return scaleDefinition[value];
};

function resolveResponsiveScale<
  Keys extends keyof ScaleDefinition,
  ScaleDefinition
>(value: ResponsiveObject<Keys>, scaleDefinition: ScaleDefinition) {
  const valueArray = [];

  for (let i = 0; i < breakpointNames.length; i++) {
    const breakpoint = breakpointNames[i];
    const keyForBreakpoint = value[breakpoint];

    // NOTE: media queries are applied by index (facepaint). nullish value
    // ensures array length always matches breakpoints
    valueArray.push(
      keyForBreakpoint ? scaleDefinition[keyForBreakpoint] : null
    );
  }

  return valueArray;
}

export const mapResponsiveProp = <Value>(value?: ResponsiveProp<Value>) => {
  if (typeof value === 'object') {
    return resolveResponsiveProp(value);
  }

  return value;
};
function resolveResponsiveProp<Value>(value: ResponsiveObject<Value>) {
  const valueArray = [];

  for (let i = 0; i < breakpointNames.length; i++) {
    const breakpoint = breakpointNames[i];
    valueArray.push(value[breakpoint] ?? null);
  }

  return valueArray;
}

export function createResponsiveMapFn<Keys extends keyof LookupMap, LookupMap>(
  lookupMap: LookupMap
) {
  return function mapResponsiveValue(prop?: ResponsiveProp<Keys>) {
    if (typeof prop == 'undefined') {
      return prop;
    }

    if (typeof prop === 'object') {
      const { mobile, tablet, desktop, wide } = prop;

      return {
        mobile: mobile ? lookupMap[mobile] : undefined,
        tablet: tablet ? lookupMap[tablet] : undefined,
        desktop: desktop ? lookupMap[desktop] : undefined,
        wide: wide ? lookupMap[wide] : undefined,
      };
    }

    return lookupMap[prop];
  };
}

// Responsive range
// ------------------------------

export type ResponsiveRangeProps = {
  above?: Exclude<Breakpoint, 'wide'>;
  below?: Exclude<Breakpoint, 'mobile'>;
};

export const responsiveRange = (
  props: ResponsiveRangeProps
): [boolean, boolean, boolean, boolean] => {
  const { above, below } = props;

  if (!above && !below) {
    return [false, false, false, false];
  }

  const startIndex = above ? breakpointNames.indexOf(above) + 1 : 0;
  const endIndex = below
    ? breakpointNames.indexOf(below) - 1
    : breakpointNames.length - 1;
  const range = breakpointNames.slice(startIndex, endIndex + 1);

  const includeMobile = range.indexOf('mobile') >= 0;
  const includeTablet = range.indexOf('tablet') >= 0;
  const includeDesktop = range.indexOf('desktop') >= 0;
  const includeWide = range.indexOf('wide') >= 0;

  return [includeMobile, includeTablet, includeDesktop, includeWide];
};

type ResponsiveArray<Value extends string | number> =
  ReadonlyArray<Value | null> & { length: 2 | 3 | 4 } & { 0: Value | null };

export const optimizeResponsiveArray = <Value extends string | number>(
  value: ResponsiveArray<Value>
): ResponsiveArray<Value> => {
  let lastValue: Value | undefined;

  const values = value.map(v => {
    if (v !== lastValue && v !== null) {
      lastValue = v;
      return v;
    }

    return null;
  });

  return [
    values[0] ?? null,
    values[1] ?? null,
    values[2] ?? null,
    values[3] ?? null,
  ] as const;
};

// ==============================
// Experiment
// ==============================

export const breakpointQuery = mapValues(
  omit(breakpoints, 'mobile'),
  bp => `@media screen and (min-width: ${bp}px)`
);
const makeMediaQuery =
  (breakpoint: keyof typeof breakpointQuery) => (styles?: CSSObject) =>
    !styles || Object.keys(styles).length === 0
      ? {}
      : {
          [breakpointQuery[breakpoint]]: styles,
        };

const mediaQuery = {
  tablet: makeMediaQuery('tablet'),
  desktop: makeMediaQuery('desktop'),
  wide: makeMediaQuery('wide'),
};
export interface ResponsiveStyle {
  mobile?: CSSObject;
  tablet?: CSSObject;
  desktop?: CSSObject;
  wide?: CSSObject;
}

export const responsiveStyles = ({
  mobile,
  tablet,
  desktop,
  wide,
}: ResponsiveStyle): CSSObject | undefined => ({
  ...mobile,
  ...(tablet || desktop || wide
    ? {
        ...mediaQuery.tablet(tablet ?? {}),
        ...mediaQuery.desktop(desktop ?? {}),
        ...mediaQuery.wide(wide ?? {}),
      }
    : {}),
});
