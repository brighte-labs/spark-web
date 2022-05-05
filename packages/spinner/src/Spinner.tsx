import { css, keyframes } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import { createIcon } from '@spark-web/icon';
import { useSynchronizedAnimation } from '@spark-web/utils';

export type SpinnerProps = {
  // TODO: match tones to design in Figma
  tone?: IconProps['tone'];
  size?: 'xxsmall' | 'xsmall';
};

export function Spinner({ tone, size = 'xxsmall' }: SpinnerProps) {
  const spinAnimationRef = useSynchronizedAnimation(spinAnimation);
  const strokeAnimationRef = useSynchronizedAnimation(strokeDashAnimation);
  const styles = useSpinnerStyles();

  return (
    <Box
      as="span"
      ref={spinAnimationRef}
      className={css(styles)}
      height={size}
      width={size}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <SpinnerIcon size={size} tone={tone} ref={strokeAnimationRef} />
    </Box>
  );
}
Spinner.displayName = 'Spinner';

const SpinnerIcon = createIcon(<circle cx={12} cy={12} r={9} />, 'SpinnerIcon');

const spinAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const strokeDashAnimation = keyframes({
  '0%': { strokeDasharray: '1px, 200px', strokeDashoffset: 0 },
  '100%': { strokeDasharray: '200px, 200px', strokeDashoffset: '-55px' },
});

function useSpinnerStyles() {
  return {
    animation: `${spinAnimation} 1.4s linear infinite`,
    '& circle': {
      animation: `${strokeDashAnimation} 1.6s cubic-bezier(0.47, 0, 0.75, 0.72) infinite`,
    },
  } as const;
}
