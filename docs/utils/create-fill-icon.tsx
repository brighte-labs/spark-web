import { css } from '@emotion/css';
import type { IconProps } from '@spark-web/icon';
import { useForegroundTone } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';

export function createFillIcon(
  children: ReactNode,
  { name, viewBox = '0 0 24 24' }: { name: string; viewBox?: string }
) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size: sizeKey = 'small', tone = 'neutral' }, forwardedRef) => {
      const {
        sizing,
        utils: { resolveResponsiveProps },
      } = useTheme();
      const fill = useForegroundTone(tone);
      const size = sizing[sizeKey];
      const styles = useMemo(
        () =>
          resolveResponsiveProps({
            fillRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: 2,
            clipRule: 'evenodd',
            stroke: 'none',
            height: size,
            fill,
            verticalAlign: 'text-bottom', // removes whitespace inside buttons
            width: size,
          }),
        [fill, resolveResponsiveProps, size]
      );

      return (
        <svg
          ref={forwardedRef}
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className={css(styles)}
        >
          {children}
        </svg>
      );
    }
  );

  Icon.displayName = name;

  return Icon;
}
