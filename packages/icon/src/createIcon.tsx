import { css } from '@emotion/css';
import type { BrighteTheme } from '@spark-web/core';
import { useTheme } from '@spark-web/core';
import type { ForegroundTone } from '@spark-web/text';
import { useForegroundTone } from '@spark-web/text';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

type SizeType = Exclude<keyof BrighteTheme['sizing'], 'full' | 'none'>;

export type IconProps = {
  /** The size of the icon. */
  size?: SizeType;
  /** The tone of the icon. */
  tone?: ForegroundTone;
};

export const createIcon = (children: ReactNode, name: string) => {
  const Icon = ({ size: sizeKey = 'small', tone = 'neutral' }: IconProps) => {
    const { sizing, utils } = useTheme();
    const stroke = useForegroundTone(tone);
    const size = sizing[sizeKey];
    const styles = useMemo(
      () =>
        utils.resolveResponsiveProps({
          fill: 'none',
          height: size,
          stroke,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          verticalAlign: 'text-bottom', // removes whitespace inside buttons
          width: size,
        }),
      [size, stroke]
    );

    return (
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={css(styles)}
      >
        {children}
      </svg>
    );
  };

  Icon.displayName = name;

  return Icon;
};
