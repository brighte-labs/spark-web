import type { BrighteTheme } from '@spark-web/core';
import { useBackgroundLightness, useTheme } from '@spark-web/core';

export type ForegroundTone = keyof Omit<
  BrighteTheme['color']['foreground'],
  'neutralInverted' | 'mutedInverted'
>;

const invertableTones = {
  neutral: {
    dark: 'neutralInverted',
    light: 'neutral',
  },
  muted: {
    dark: 'mutedInverted',
    light: 'muted',
  },
  link: {
    dark: 'neutralInverted',
    light: 'link',
  },
} as const;

export function useForegroundTone(tone: ForegroundTone) {
  const theme = useTheme();
  const backgroundLightness = useBackgroundLightness();

  if (tone in invertableTones) {
    return theme.color.foreground[
      invertableTones[tone as keyof typeof invertableTones][backgroundLightness]
    ];
  }

  return theme.color.foreground[tone];
}
