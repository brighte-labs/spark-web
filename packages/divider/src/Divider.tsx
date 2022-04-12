import { css } from '@emotion/css';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';

/**
 * NOTE: a combination of approaches to resolve layout issues:
 * 1. flex support
 * 2. grid support
 */
const directionMap = {
  row: ['minHeight', 'width'],
  column: ['minWidth', 'height'],
};

// TODO: handle dark backgrounds
type DividerColor = keyof Omit<
  BrighteTheme['border']['color'],
  'focus' | 'standardInverted' | 'field' | 'fieldAccent' | 'fieldDisabled'
>;

export type DividerProps = {
  /** The color of the divider */
  color?: DividerColor;
  /** The width of the divider */
  width?: keyof BrighteTheme['border']['width'];
  /** Display the divider vertically */
  vertical?: boolean;
};

export const Divider = ({
  color = 'standard',
  vertical,
  width = 'standard',
}: DividerProps) => {
  const { border } = useTheme();
  const direction = vertical ? 'row' : 'column';
  const [mainAxis, crossAxis] = directionMap[direction];

  const styles = {
    alignSelf: 'stretch', // 1.
    backgroundColor: border.color[color],
    flexShrink: 0,
    [crossAxis]: border.width[width],
    [mainAxis]: '100%', // 2.
  };

  return <div className={css(styles)} />;
};
