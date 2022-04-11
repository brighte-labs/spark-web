import type { FontMetrics } from '@capsizecss/core';
import interFontMetrics from '@capsizecss/metrics/inter';

import type { Breakpoint } from './breakpoints';
import { colors } from './colors';

// NOTE: all tokens are currently assumptions and will need to be reviewed with
// the design team, but the shape shouldn't change too much.
const aestheticoFontMetrics: FontMetrics = {
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
const temporaryTokens = {
  colors: {
    'temporary-green': '#00d299',
    'temporary-green-low': '#00a87b',
    'temporary-green-high': '#00e2a2',
    'temporary-green-soft': '#edfaf5',

    'temporary-yellow': '#ffbb66',
    'temporary-yellow-low': '#ff9f29',
    'temporary-yellow-high': '#ffcc77',
    'temporary-yellow-soft': '#fff5eb',

    'temporary-dark': '#1a2a3a',
    'temporary-dark-low': '#001a2a',
    'temporary-dark-high': '#2a3a4a',
    'temporary-dark-soft': '#f3f8fc',

    'temporary-blue': '#599cff',
    'temporary-blue-low': '#2e82ff',
    'temporary-blue-high': '#70aaff',
    'temporary-blue-soft': '#f3f8fc',

    'temporary-red': '#ff8181',
    'temporary-red-low': '#ff5c5c',
    'temporary-red-high': '#ff9595',
    'temporary-red-soft': '#fff4f4',
  },
  spacing: {
    'temporary-3xlarge': 48,
    'temporary-4xlarge': 64,
    'temporary-5xlarge': 128,
  },
};

const surface = colors.primary[0];
const primary = colors.primary[500];
const text = colors.neutral[700];

export const defaultTokens = {
  name: 'Brighte web: light',

  // tweak for breakpoints
  typography: {
    fontFamily: {
      sans: {
        fontMetrics: interFontMetrics as FontMetrics,
        name: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      },
      display: {
        fontMetrics: aestheticoFontMetrics,
        name: '"Aesthetico", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      },
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      strong: 700,
    },
    heading: {
      weight: {
        weak: 'regular',
        regular: 'medium',
      },
      level: {
        '1': {
          mobile: {
            fontSize: 28,
            rows: 9,
          },
          tablet: {
            fontSize: 42,
            rows: 11,
          },
        },
        '2': {
          mobile: {
            fontSize: 21,
            rows: 8,
          },
          tablet: {
            fontSize: 28,
            rows: 9,
          },
        },
        '3': {
          mobile: {
            fontSize: 18,
            rows: 6,
          },
          tablet: {
            fontSize: 21,
            rows: 7,
          },
        },
        '4': {
          mobile: {
            fontSize: 14,
            rows: 5,
          },
          tablet: {
            fontSize: 18,
            rows: 7,
          },
        },
      },
    },
    text: {
      xsmall: {
        mobile: {
          fontSize: 12,
          rows: 5,
        },
        tablet: {
          fontSize: 12,
          rows: 5,
        },
      },
      small: {
        mobile: {
          fontSize: 14,
          rows: 5,
        },
        tablet: {
          fontSize: 14,
          rows: 5,
        },
      },
      standard: {
        mobile: {
          fontSize: 16,
          rows: 6,
        },
        tablet: {
          fontSize: 16,
          rows: 6,
        },
      },
      large: {
        mobile: {
          fontSize: 18,
          rows: 7,
        },
        tablet: {
          fontSize: 18,
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
      neutral: text,
      standard: '#e5e7eb',
      standardInverted: colors.neutral[0],

      field: colors.neutral[200],
      fieldHover: colors.neutral[300],
      fieldAccent: primary,
      fieldDisabled: '#d3d3d3',

      // tones

      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],

      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[600],
      secondaryActive: colors.secondary[700],

      positiveFocus: colors.primary[0],
      cautionFocus: colors.primary[0],
      criticalFocus: colors.primary[0],
      infoFocus: colors.primary[0],

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

      ...temporaryTokens.colors,
    },
  },
  color: {
    foreground: {
      neutral: text,
      neutralInverted: colors.neutral[0],
      muted: '#6b7280',
      mutedInverted: 'hsla(0, 0%, 100%, 0.75)',
      link: colors.primary[600],
      disabled: '#aeaeae',
      fieldAccent: primary,
      placeholder: '#6b7280',

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

      ...temporaryTokens.colors,
    },
    background: {
      muted: '#6b7280',
      disabled: '#aeaeae',

      backdrop: 'hsla(0, 0%, 0%, 0.4)',
      body: '#f3f4f6',
      surface: surface,
      surfaceMuted: '#f3f4f6',
      surfacePressed: '#f9fafb',

      fieldAccent: text,
      input: surface,
      inputPressed: '#f9fafb',
      inputDisabled: '#f3f4f6',

      // tones
      accent: '#8b5cf6',
      accentMuted: '#f7f5ff',

      neutral: colors.neutral[0],
      neutralLow: colors.neutral[50],

      primary: colors.primary[600],
      primaryLow: colors.primary[100],
      primaryMuted: '#f0fff1',

      secondary: colors.secondary[600],
      // TODO: using yellow instead of secondary
      secondaryLow: colors.yellow[100],
      secondaryMuted: '#f0fff1',

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

      ...temporaryTokens.colors,
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

    ...temporaryTokens.spacing,
  },
  sizing: {
    xxsmall: 16,
    xsmall: 24,
    small: 32,
    medium: 44,
    large: 56,
  },
  shadow: {
    small:
      '0 2px 4px 0px rgba(28,28,28,.1), 0 2px 2px -2px rgba(28,28,28,.1), 0 4px 4px -4px rgba(28,28,28,.2)',
    medium:
      '0 2px 4px 0px rgba(28,28,28,.1), 0 8px 8px -4px rgba(28,28,28,.1), 0 12px 12px -8px rgba(28,28,28,.2)',
    large:
      '0 2px 4px 0px rgba(28,28,28,.1), 0 12px 12px -4px rgba(28,28,28,.1), 0 20px 20px -12px rgba(28,28,28,.2)',
  },
  animation: {
    standard: {
      duration: 300,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
};

export type BrighteTokens = typeof defaultTokens;
