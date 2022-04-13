import { useBackgroundLightness } from '@spark-web/box';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';

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
