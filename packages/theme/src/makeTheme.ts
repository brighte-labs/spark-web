import type { FontMetrics } from '@capsizecss/core';
import { getCapHeight, precomputeValues } from '@capsizecss/core';
import mapValues from 'lodash/mapValues';

import { breakpoints } from './breakpoints';
import { getLightVariant, isLight } from './colorUtils';
import { makeThemeUtils } from './themeUtils';
import type {
  BrighteTokens,
  ResponsiveTextDefinition,
  TextDefinition,
} from './tokens';

// Typography
// ------------------------------

export type BrighteTextDefinition = ReturnType<typeof fontSizeToCapHeight>;

/**
 * Afford consumers the simplicity of pixel values for token declarations while
 * supporting our users' browser preferences.
 */
function pxToRem(value: number | string) {
  const px = typeof value === 'string' ? parseFloat(value) : value;

  // NOTE: assume default browser settings of 16px root
  const modifier = 1 / 16;
  return `${px * modifier}rem`;
}

/**
 * Calculate leading and trim styles using
 * [Capsize](https://seek-oss.github.io/capsize/) to ensure vertical spacing
 * around text elements behaves as expected.
 */
function fontSizeToCapHeight(
  definition: TextDefinition,
  fontMetrics: FontMetrics
) {
  const rowHeight = 4; // TODO: move to theme?
  const capHeight = getCapHeight({
    fontSize: definition.fontSize,
    fontMetrics,
  });

  const { fontSize, lineHeight, ...trims } = precomputeValues({
    fontSize: definition.fontSize,
    leading: definition.rows * rowHeight,
    fontMetrics,
  });

  return {
    fontSize: pxToRem(fontSize),
    lineHeight: pxToRem(lineHeight),
    capHeight: pxToRem(capHeight),
    trims,
  };
}

function responsiveTypography(
  definition: ResponsiveTextDefinition,
  fontMetrics: FontMetrics
) {
  const { mobile, tablet } = definition;

  return {
    mobile: fontSizeToCapHeight(mobile, fontMetrics),
    tablet: fontSizeToCapHeight(tablet, fontMetrics),
  };
}

/**
 * Apply "capsized" style rules to the typographic tokens, making them available
 * in the theme.
 */
function decorateTypography(typography: BrighteTokens['typography']) {
  const { heading, text, fontFamily } = typography;

  return {
    ...typography,
    heading: {
      ...heading,
      level: {
        ...mapValues(heading.level, definition =>
          responsiveTypography(definition, fontFamily.display.fontMetrics)
        ),
      } as Record<
        keyof typeof heading.level,
        ReturnType<typeof responsiveTypography>
      >,
    },
    text: {
      ...text,
      ...mapValues(text, definition =>
        responsiveTypography(definition, fontFamily.sans.fontMetrics)
      ),
    },
  };
}

function decorateTokens(tokens: BrighteTokens) {
  const { border, color, sizing, spacing, typography, ...restTokens } = tokens;

  const decoratedTokens = {
    breakpoint: breakpoints,
    border: {
      ...border,
      radius: {
        ...border.radius,
        full: 9999, // prefer over percentage to avoid ovals for irregular rectangles
      },
    },
    color: {
      ...color,
      background: {
        ...color.background,

        infoLight: getLightVariant(color.background.info),
        criticalLight: getLightVariant(color.background.critical),
        positiveLight: getLightVariant(color.background.positive),
        cautionLight: getLightVariant(color.background.caution),
      },
    },
    spacing: {
      ...spacing,
      none: 0,
    },
    sizing: {
      ...sizing,
      none: 0,
      full: '100%',
    },
    typography: decorateTypography(typography),
    ...restTokens,
  };

  return decoratedTokens;
}

// Export
// ------------------------------

export function makeBrighteTheme(tokens: BrighteTokens) {
  const decoratedTokens = decorateTokens(tokens);

  return {
    ...decoratedTokens,
    backgroundLightness: mapValues(
      decoratedTokens.color.background,
      background => {
        return isLight(background) ? 'light' : 'dark';
      }
    ),
    utils: makeThemeUtils(),
  };
}

export type BrighteTheme = ReturnType<typeof makeBrighteTheme>;
