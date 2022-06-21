const white = '#ffffff';

export const colors = {
  neutral: {
    // Surfaces, Cards. Text
    '0': white,

    // Soft surfaces
    '50': '#fafcfe',

    // Darkest surfaces
    '100': '#f1f4fb',

    // Borders
    '200': '#dce1ec',

    // Hovered input borders
    '300': '#c7cedb',

    // Reserved
    // '400': white,

    // Disabled background
    '500': '#98a2b8',

    // Body copy, active borders
    '600': '#646f84',

    // Headlines
    '700': '#1a2a3a',
  },

  brandPrimary: {
    // Bold button foreground
    '0': white,

    // Subtle button hover background
    '50': '#f5fdf9',

    // Subtle button background
    '100': '#edfaf5',

    // Subtle button active background
    '200': '#c8eada',

    // Borders
    '300': '#9acbb8',

    // Reserved
    // '400': white,

    // Bold button hover background
    '500': '#00c28d',

    // Bold button background, active borders
    '600': '#00a87b',

    // Subtle button foreground, bold button active background
    '700': '#108663',
  },

  brandSecondary: {
    // Bold button foreground
    '0': white,

    // Subtle button hover background
    '50': '#fef5eb',

    // Subtle button background
    '100': '#fff0e0',

    // Subtle button active background (Reserved)
    // '200': white,

    // Borders (Reserved)
    // '300': white,

    // Reserved
    // '400': white,

    // Bold button hover background
    '500': '#ffbb66',

    // Bold button background, active borders
    '600': '#ff9f29',

    // Subtle button foreground, bold button active background
    '700': '#be5816',
  },

  positive: {
    '0': white,
    '50': '#f6fbf8',
    '100': '#fof9f1',
    '200': '#cde9d2',
    '300': '#b1dab9',
    // 400: 'Reserved',
    '500': '#1e9c65',
    '600': '#2c855d',
    '700': '#327e59',
  },

  informative: {
    '0': white,
    '50': '#f6fafd',
    '100': '#f3f8fc',
    '200': '#d0e4ff',
    '300': '#b7d2f4',
    // 400: 'Reserved',
    '500': '#2b8aed',
    '600': '#0677d6',
    '700': '#106fb8',
  },

  caution: {
    '0': white,
    '50': '#fefaf6',
    '100': '#fff5eb',
    '200': '#fdddc4',
    '300': '#face9b',
    // 400: 'Reserved',
    '500': '#ffaa44',
    '600': '#be5c1c',
    '700': '#ad541a',
  },

  critical: {
    '0': white,
    '50': '#fef8f8',
    '100': '#fff4f4',
    '200': '#ffdad7',
    '300': '#fec1b5',
    // 400: 'Reserved',
    '500': '#f53841',
    '600': '#e61e32',
    '700': '#c81b0e',
  },
};

export const background = {
  // Surface
  surface: colors.neutral['0'],
  surfaceHover: colors.neutral['100'],
  surfacePressed: colors.neutral['300'],
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
  primarySubtleHover: colors.brandPrimary['200'],
  primarySubtlePressed: colors.brandPrimary['200'],
  primaryBold: colors.brandPrimary['500'],
  primaryBoldHover: colors.brandPrimary['600'],
  primaryBoldPressed: colors.brandPrimary['700'],

  // Secondary
  secondarySubtle: colors.brandSecondary['100'],
  secondaryBold: colors.brandSecondary['500'],
  secondaryBoldHover: colors.brandSecondary['600'],
  secondaryBoldPressed: colors.brandSecondary['700'],

  // Positive
  positiveSubtle: colors.positive['100'],
  positiveSubtleHover: colors.positive['200'],
  positiveSubtlePressed: colors.positive['300'],
  positiveBold: colors.positive['500'],

  // Info
  infoSubtle: colors.informative['100'],
  infoSubtleHover: colors.informative['200'],
  infoSubtlePressed: colors.informative['300'],
  infoBold: colors.informative['500'],

  // Caution
  cautionSubtle: colors.caution['100'],
  cautionSubtleHover: colors.caution['200'],
  cautionSubtlePressed: colors.caution['300'],
  cautionBold: colors.caution['500'],

  // Critical
  criticalHover: colors.critical['100'],
  criticalSubtle: colors.critical['100'],
  criticalSubtleHover: colors.critical['200'],
  criticalSubtlePressed: colors.critical['300'],
  criticalBold: colors.critical['500'],
  criticalBoldHover: colors.critical['600'],
  criticalBoldPressed: colors.critical['700'],
};

export const foreground = {
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
};

export const borderColor = {
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
};

export const status = {
  neutral: colors.neutral['700'],
  positive: colors.positive['500'],
  info: colors.informative['500'],
  caution: colors.caution['500'],
  critical: colors.critical['500'],
  accent: '#8b5cf6',
};

export const decorative = {
  green: {
    soft: '#edfaf5',
    high: '#00e2a2',
    medium: '#00c28c',
    low: '#00a87b',
  },
  yellow: {
    soft: '#fff0e0',
    high: '#ffcc77',
    medium: '#ffbb66',
    low: '#ff9f29',
  },
  red: {
    soft: '#fff4f4',
    high: '#ff9595',
    medium: '#ff8181',
    low: '#ff5c5c',
  },
  blue: {
    soft: '#f3f8fc',
    high: '#70aaff',
    medium: '#599cff',
    low: '#2e82ff',
  },
  dark: {
    soft: '#f3f8fc',
    high: '#2a3a4a',
    medium: '#1a2a3a',
    low: '#001a2a',
  },
};
