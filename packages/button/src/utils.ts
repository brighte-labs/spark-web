import type { BoxProps, BrighteTheme } from '@spark-web/core';
import type { ForegroundTone } from '@spark-web/text';

import type { ButtonProminence, ButtonTone } from './types';

type ButtonStyles = {
  background: BoxProps['background'];
  border?: BoxProps['border'];
  borderWidth?: BoxProps['borderWidth'];
  textTone?: ForegroundTone;
  // Hover
  backgroundHover: keyof BrighteTheme['backgroundInteractions'];
  borderHover?: keyof BrighteTheme['border']['color'];
  textToneHover?: keyof BrighteTheme['color']['foreground'];
  // Active
  backgroundActive: keyof BrighteTheme['backgroundInteractions'];
  borderActive?: keyof BrighteTheme['border']['color'];
  textToneActive?: keyof BrighteTheme['color']['foreground'];
};

export const variants: Record<
  ButtonProminence,
  Record<ButtonTone, ButtonStyles | undefined>
> = {
  high: {
    primary: {
      background: 'primary',
      backgroundHover: 'primaryHover',
      backgroundActive: 'primaryActive',
    },
    secondary: {
      background: 'secondary',
      backgroundHover: 'secondaryHover',
      backgroundActive: 'secondaryActive',
    },
    neutral: {
      background: 'neutral',
      border: 'field',
      backgroundHover: 'neutralHover',
      backgroundActive: 'neutralActive',
    },
    positive: {
      background: 'positive',
      backgroundHover: 'positiveHover',
      backgroundActive: 'positiveActive',
    },
    critical: {
      background: 'critical',
      backgroundHover: 'criticalHover',
      backgroundActive: 'criticalActive',
    },
    caution: undefined,
    info: undefined,
  },
  low: {
    primary: {
      background: 'surface',
      border: 'primary',
      borderWidth: 'large',
      textTone: 'primary',

      backgroundHover: 'none',
      borderHover: 'primaryHover',
      textToneHover: 'primaryHover',

      backgroundActive: 'none',
      borderActive: 'primaryActive',
      textToneActive: 'primaryActive',
    },
    secondary: {
      background: 'surface',
      border: 'secondary',
      borderWidth: 'large',
      textTone: 'secondary',

      backgroundHover: 'none',
      borderHover: 'secondaryHover',
      textToneHover: 'secondaryHover',

      backgroundActive: 'none',
      borderActive: 'secondaryActive',
      textToneActive: 'secondaryActive',
    },
    neutral: {
      background: 'neutralLow',
      backgroundHover: 'neutralLowHover',
      backgroundActive: 'neutralLowActive',
    },
    positive: {
      background: 'positiveLow',
      backgroundHover: 'positiveLowHover',
      backgroundActive: 'positiveLowActive',
    },
    caution: {
      background: 'cautionLow',
      backgroundHover: 'cautionLowHover',
      backgroundActive: 'cautionLowActive',
    },
    critical: {
      background: 'criticalLow',
      backgroundHover: 'criticalLowHover',
      backgroundActive: 'criticalLowActive',
    },
    info: {
      background: 'infoLow',
      backgroundHover: 'infoLowHover',
      backgroundActive: 'infoLowActive',
    },
  },
  none: {
    primary: {
      background: 'surface',
      textTone: 'primaryActive',
      backgroundHover: 'primaryLowHover',
      backgroundActive: 'primaryLowActive',
    },
    secondary: {
      background: 'surface',
      textTone: 'secondaryActive',
      backgroundHover: 'secondaryLowHover',
      backgroundActive: 'secondaryLowActive',
    },
    neutral: {
      background: 'surface',
      textTone: 'neutral',
      backgroundHover: 'neutralLowHover',
      backgroundActive: 'neutralLowActive',
    },
    positive: {
      background: 'surface',
      textTone: 'positive',
      backgroundHover: 'positiveLowHover',
      backgroundActive: 'positiveLowActive',
    },
    caution: {
      background: 'surface',
      textTone: 'caution',
      backgroundHover: 'cautionLowHover',
      backgroundActive: 'cautionLowActive',
    },
    critical: {
      background: 'surface',
      textTone: 'critical',
      backgroundHover: 'criticalLowHover',
      backgroundActive: 'criticalLowActive',
    },
    info: {
      background: 'surface',
      textTone: 'info',
      backgroundHover: 'infoLowHover',
      backgroundActive: 'infoLowActive',
    },
  },
} as const;

export const mapTokens = {
  fontSize: {
    medium: 'small',
    large: 'standard',
  },
  size: {
    medium: 'medium',
    large: 'large',
  },
  spacing: {
    medium: 'medium',
    large: 'xlarge',
  },
} as const;
