import type { FontMetrics } from '@capsizecss/core';

import type { Breakpoint } from './breakpoints';
import { colors } from './colors';

// NOTE: all tokens are currently assumptions and will need to be reviewed with
// the design team, but the shape shouldn't change too much.
const aesteticoFontMetrics: FontMetrics = {
  capHeight: 666,
  ascent: 980,
  descent: -340,
  lineGap: 0,
  unitsPerEm: 1000,
};

// Typography
// ------------------------------

export type TextBreakpoint = Exclude<Breakpoint, 'desktop' | 'wide'>;

export type TextDefinition = {
  fontSize: number;
  rows: number;
};

export type ResponsiveTextDefinition = Record<TextBreakpoint, TextDefinition>;

// Tokens
// ------------------------------
export const defaultTokens = {
  name: 'Brighte web: light',

  // tweak for breakpoints
  typography: {
    fontFamily: {
      sans: {
        fontMetrics: aesteticoFontMetrics,
        name: '"Aestetico", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      display: {
        fontMetrics: aesteticoFontMetrics,
        name: '"Aestetico", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
    },
    fontWeight: {
      regular: 400,
      semibold: 600,
    },
    heading: {
      weight: {
        weak: 'regular',
        regular: 'semibold',
      },
      level: {
        '1': {
          mobile: {
            fontSize: 35,
            rows: 9,
          },
          tablet: {
            fontSize: 35,
            rows: 11,
          },
        },
        '2': {
          mobile: {
            fontSize: 23,
            rows: 8,
          },
          tablet: {
            fontSize: 23,
            rows: 9,
          },
        },
        '3': {
          mobile: {
            fontSize: 19,
            rows: 6,
          },
          tablet: {
            fontSize: 19,
            rows: 7,
          },
        },
        '4': {
          mobile: {
            fontSize: 17,
            rows: 5,
          },
          tablet: {
            fontSize: 17,
            rows: 7,
          },
        },
      },
    },
    text: {
      xsmall: {
        mobile: {
          fontSize: 13,
          rows: 5,
        },
        tablet: {
          fontSize: 13,
          rows: 5,
        },
      },
      small: {
        mobile: {
          fontSize: 15,
          rows: 5,
        },
        tablet: {
          fontSize: 15,
          rows: 5,
        },
      },
      standard: {
        mobile: {
          fontSize: 17,
          rows: 6,
        },
        tablet: {
          fontSize: 17,
          rows: 6,
        },
      },
      large: {
        mobile: {
          fontSize: 19,
          rows: 7,
        },
        tablet: {
          fontSize: 19,
          rows: 7,
        },
      },
    },
  },
  border: {
    radius: {
      small: 4,
      medium: 8,
      large: 16,
    },
    width: {
      standard: 1,
      large: 2,
    },
    color: {
      // Neutral
      surface: colors.neutral['200'],

      // Primary
      primary: colors.brandPrimary['300'],
      primaryBold: colors.brandPrimary['500'],

      // Input
      input: colors.neutral['200'],
      inputHover: colors.neutral['300'],
      inputActive: colors.brandPrimary['600'],
      inputCritical: colors.critical['600'],
      inputCriticalHover: colors.critical['700'],

      // Positive
      positive: colors.positive['300'],

      // Info
      info: colors.informative['300'],

      // Caution
      caution: colors.caution['300'],

      // Critical
      critical: colors.critical['300'],
      criticalBold: colors.critical['600'],
    },
  },
  color: {
    foreground: {
      // Neutrals
      bold: colors.neutral['700'],
      subtle: colors.neutral['600'],
      boldInverted: colors.neutral['0'],
      boldDisabled: colors.neutral['600'],
      subtleDisabled: colors.neutral['500'],
      // TODO: Check with Jordan
      boldInvertedDisabled: colors.neutral['0'],
      // TODO: Check with Jordan
      link: colors.informative['600'],

      // Primary
      primarySubtle: colors.brandPrimary['700'],
      primaryBold: colors.brandPrimary['0'],

      // Positive
      positiveSubtle: colors.positive['700'],
      positiveBold: colors.positive['0'],

      // Info
      infoSubtle: colors.informative['700'],
      infoBold: colors.informative['0'],

      // Caution
      cautionSubtle: colors.caution['700'],
      // TODO: Check with Jordan
      cautionBold: colors.neutral['700'],

      // Critical
      criticalSubtle: colors.critical['700'],
      criticalBold: colors.critical['0'],
    },
    background: {
      // Surface
      surface: colors.neutral['0'],
      surfaceDisabled: colors.neutral['500'],
      surfaceMedium: colors.neutral['100'],

      // Page
      page: colors.neutral['0'],
      pageSubtle: colors.neutral['50'],

      // Input
      inputOnScene: colors.neutral['0'],
      inputOnSurface: colors.neutral['0'],
      inputDisabled: colors.neutral['50'],

      // Primary
      primarySubtle: colors.brandPrimary['100'],
      primaryBold: colors.brandPrimary['500'],

      // Secondary
      secondarySubtle: colors.brandSecondary['100'],
      secondaryBold: colors.brandSecondary['500'],

      // Positive
      positiveSubtle: colors.positive['100'],
      positiveBold: colors.positive['500'],

      // Info
      infoSubtle: colors.informative['100'],
      infoBold: colors.informative['500'],

      // Caution
      cautionSubtle: colors.caution['100'],
      cautionBold: colors.caution['500'],

      // Critical
      criticalSubtle: colors.critical['100'],
      criticalBold: colors.critical['500'],
    },
  },
  backgroundInteractions: {
    // Surface
    surfaceHover: colors.neutral['100'],
    surfacePressed: colors.neutral['300'],

    // Primary
    primarySubtleHover: colors.brandPrimary['200'],
    primarySubtlePressed: colors.brandPrimary['200'],
    primaryBoldHover: colors.brandPrimary['600'],
    primaryBoldPressed: colors.brandPrimary['700'],

    // Secondary
    secondaryBoldHover: colors.brandSecondary['600'],
    secondaryBoldPressed: colors.brandSecondary['700'],

    // Positive
    positiveSubtleHover: colors.positive['200'],
    positiveSubtlePressed: colors.positive['300'],

    // Info
    infoSubtleHover: colors.informative['200'],
    infoSubtlePressed: colors.informative['300'],

    // Caution
    cautionSubtleHover: colors.caution['200'],
    cautionSubtlePressed: colors.caution['300'],

    // Critical
    criticalHover: colors.critical['100'],
    criticalSubtle: colors.critical['100'],
    criticalSubtleHover: colors.critical['200'],
    criticalSubtlePressed: colors.critical['300'],
    criticalBoldHover: colors.critical['600'],
    criticalBoldPressed: colors.critical['700'],
  },

  // misc
  contentWidth: {
    xsmall: 400,
    small: 660,
    medium: 940,
    large: 1280,
    xlarge: 1400,
  },
  elevation: {
    dropdownBlanket: 90,
    dropdown: 100,
    sticky: 200,
    modalBlanket: 290,
    modal: 300,
    notification: 400,
  },
  spacing: {
    xxsmall: 2,
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    xxlarge: 32,
  },
  sizing: {
    xxsmall: 16,
    xsmall: 24,
    small: 32,
    medium: 44,
    large: 56,
  },
  shadow: {
    small: '0 1px 2px rgba(0, 0, 0, 0.05)',
    medium: '0 2px 8px rgba(0, 0, 0, 0.04)',
    large: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  animation: {
    standard: {
      duration: 300,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
};

export type BrighteTokens = typeof defaultTokens;
