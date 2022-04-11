import type { BrighteTheme } from '@spark-web/core';
import { useTheme } from '@spark-web/core';
import { createTextStyles, useForegroundTone } from '@spark-web/text';

type HeadingLevel = keyof BrighteTheme['typography']['heading']['level'];

export type UseHeadingProps = {
  /** The horizontal alignment. */
  align?: 'left' | 'center' | 'right';
  /** The heading level. */
  level: HeadingLevel;
};

export function useHeading({ align, level }: UseHeadingProps) {
  const { typography, utils } = useTheme();
  const color = useForegroundTone('neutral');
  const { mobile, tablet } = typography.heading.level[level];
  const responsiveStyles = utils.responsiveStyles({
    mobile: createTextStyles(mobile),
    tablet: createTextStyles(tablet),
  });

  const styles = [
    {
      color,
      fontFamily: typography.fontFamily.display.name,
      fontWeight: typography.fontWeight.medium,
      textAlign: align,
    },
    responsiveStyles,
  ];

  return styles;
}
