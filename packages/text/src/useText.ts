import type {
  BrighteTextDefinition,
  BrighteTheme } from '@spark-web/theme';
import {
  useTheme,
} from '@spark-web/theme';

import type { ForegroundTone } from './useForegroundTone';
import { useForegroundTone } from './useForegroundTone';

export type UseTextProps = {
  /** Apply leading-trim styles. */
  baseline?: boolean;
  /** The size of the text. */
  size: keyof BrighteTheme['typography']['text'];
  /** The tone of the text. */
  tone: ForegroundTone;
  /** The weight of the text. */
  weight: keyof BrighteTheme['typography']['fontWeight'];
};

export function useText({ baseline = true, size, tone, weight }: UseTextProps) {
  const { typography, utils } = useTheme();
  const color = useForegroundTone(tone);
  const { mobile, tablet } = typography.text[size];
  const responsiveStyles = utils.responsiveStyles({
    mobile: createTextStyles(mobile, { includeTrims: baseline }),
    tablet: createTextStyles(tablet, { includeTrims: baseline }),
  });

  const styles = [
    {
      color,
      fontFamily: typography.fontFamily.sans.name,
      fontWeight: typography.fontWeight[weight],
    },
    responsiveStyles,
  ];

  return styles;
}

export function createTextStyles(
  { fontSize, lineHeight, trims }: BrighteTextDefinition,
  { includeTrims = true } = {}
) {
  const pseudo = { content: '" "', display: 'table' };
  const leadingTrim = includeTrims
    ? {
        '::before': { ...pseudo, marginBottom: trims.capHeightTrim },
        '::after': { ...pseudo, marginTop: trims.baselineTrim },
      }
    : null;

  return {
    fontSize,
    lineHeight,
    ...leadingTrim,
  };
}
