import { css } from '@emotion/css';
import type { ForegroundTone } from '@spark-web/text';
import { useForegroundTone } from '@spark-web/text';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import { useMemo } from 'react';

type SizeType = Exclude<keyof BrighteTheme['sizing'], 'full' | 'none'>;

export function BrighteIcon({
  size: sizeKey = 'small',
  tone = 'primary',
}: {
  size?: SizeType;
  tone?: ForegroundTone;
}) {
  const fill = useForegroundTone(tone);
  const theme = useTheme();
  const size = theme.sizing[sizeKey];
  const styles = useMemo(
    () => ({
      fill,
      height: size,
      width: size,
      stroke: 'none',
      verticalAlign: 'text-bottom', // removes whitespace inside buttons
    }),
    [fill, size]
  );

  return (
    <svg
      aria-label="Brighte logo"
      role="img"
      focusable="false"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      className={css(styles)}
    >
      <path d="M19.552 11.008s.796-.399 2.44-.661a12.82 12.82 0 0 1 2.37-.215V.016a25.506 25.506 0 0 0-8.468 1.486l3.658 9.506Zm-3.34 1.894s-1.073.876-1.62 1.43c-.492.494-1.477 1.789-1.477 1.789l-8.941-5.397a22.79 22.79 0 0 1 6.018-6.265l6.02 8.443ZM10.8 23.508a15.64 15.64 0 0 1 .761-4.127c.082-.242.14-.428.14-.428L1.592 16.224A24.985 24.985 0 0 0 .43 23.841v.109h10.35s.005-.199.019-.442Zm13.563-3.93v-5.802c-6.014.123-9.931 4.256-9.931 10.065v.109h5.802c.002-.026.002-.051.002-.076v-.025c0-2.526 1.477-4.17 4.127-4.271Z" />
    </svg>
  );
}
