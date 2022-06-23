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
      neutral: colors.neutral[700],
      standard: colors.neutral[200],
      standardInverted: colors.neutral[0],

      field: colors.neutral[200],
      fieldHover: colors.neutral[300],
      fieldAccent: colors.primary[500],
      fieldDisabled: colors.neutral[300],

      // tones

      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],

      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[600],
      secondaryActive: colors.secondary[700],

      accent: '#8b5cf6',
      accentMuted: '#997dd8',

      caution: colors.yellow[600],
      cautionMuted: colors.yellow[500],

      critical: colors.red[600],
      criticalMuted: colors.red[500],

      info: colors.blue[600],
      infoMuted: colors.blue[500],

      positive: colors.green[600],
      positiveMuted: colors.green[500],
    },
  },
  color: {
    foreground: {
      neutral: colors.neutral[700],
      neutralInverted: colors.neutral[0],
      muted: colors.neutral[600],
      mutedInverted: 'hsla(0, 0%, 100%, 0.75)',
      link: colors.primary[600],
      disabled: colors.neutral[500],
      fieldAccent: colors.primary[500],
      placeholder: colors.neutral[600],

      // tones
      accent: '#8b5cf6',

      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],

      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[600],
      secondaryActive: colors.secondary[700],

      caution: colors.yellow[700],
      critical: colors.red[700],
      info: colors.blue[700],
      positive: colors.green[700],
    },
    background: {
      muted: colors.neutral[600],
      disabled: colors.neutral[500],

      backdrop: 'hsla(0, 0%, 0%, 0.4)',
      body: colors.neutral[50],
      surface: colors.primary[0],
      surfaceMuted: colors.neutral[50],
      surfacePressed: colors.neutral[300],

      fieldAccent: colors.neutral[700],
      input: colors.primary[0],
      inputPressed: colors.neutral[100],
      inputDisabled: colors.neutral[50],

      // tones
      accent: '#8b5cf6',
      accentMuted: '#f7f5ff',

      neutral: colors.neutral[0],
      neutralLow: colors.neutral[50],

      primary: colors.primary[600],
      primaryLow: colors.primary[100],
      primaryMuted: colors.primary[50],

      secondary: colors.secondary[600],
      secondaryLow: colors.secondary[100],
      secondaryMuted: colors.secondary[50],

      caution: colors.yellow[600],
      cautionLow: colors.yellow[100],
      cautionMuted: colors.yellow[50],

      critical: colors.red[600],
      criticalLow: colors.red[100],
      criticalMuted: colors.red[50],

      info: colors.blue[600],
      infoLow: colors.blue[100],
      infoMuted: colors.blue[50],

      positive: colors.green[600],
      positiveLow: colors.green[100],
      positiveMuted: colors.green[50],
    },
  },
  backgroundInteractions: {
    none: colors.neutral[0],

    primaryActive: colors.primary[700],
    primaryHover: colors.primary[500],
    primaryLowHover: colors.primary[100],
    primaryLowActive: colors.primary[200],

    secondaryActive: colors.secondary[700],
    secondaryHover: colors.secondary[500],
    secondaryLowHover: colors.yellow[100],
    secondaryLowActive: colors.yellow[200],

    neutralHover: colors.neutral[100],
    neutralActive: colors.neutral[200],
    neutralLowHover: colors.neutral[100],
    neutralLowActive: colors.neutral[200],

    cautionLowHover: colors.yellow[200],
    cautionLowActive: colors.yellow[300],

    criticalActive: colors.red[700],
    criticalHover: colors.red[500],
    criticalLowHover: colors.red[200],
    criticalLowActive: colors.red[300],

    infoLowHover: colors.blue[200],
    infoLowActive: colors.blue[300],

    positiveHover: colors.green[500],
    positiveActive: colors.green[700],
    positiveLowHover: colors.green[200],
    positiveLowActive: colors.green[300],
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
