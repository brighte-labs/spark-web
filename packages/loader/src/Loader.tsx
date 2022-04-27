import { css, keyframes } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import { createIcon } from '@spark-web/icon';
import { useSynchronizedAnimation } from '@spark-web/utils';

export type LoaderProps = {
  // TODO: match tones to design in Figma
  tone?: IconProps['tone'];
  size?: 'xxsmall' | 'xsmall';
};

export function Loader({ tone, size = 'xxsmall' }: LoaderProps) {
  const spinAnimationRef = useSynchronizedAnimation(spinAnimation);
  const strokeAnimationRef = useSynchronizedAnimation(strokeDashAnimation);
  const styles = useLoaderStyles();

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
Loader.displayName = 'Loader';

const SpinnerIcon = createIcon(<circle cx={12} cy={12} r={9} />, 'SpinnerIcon');

const spinAnimation = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const strokeDashAnimation = keyframes({
  '0%': {
    strokeDasharray: '1px, 200px',
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '100px, 200px',
    strokeDashoffset: '-15px',
  },
  '100%': {
    strokeDasharray: '100px, 200px',
    strokeDashoffset: '-125px',
  },
});

function useLoaderStyles() {
  return {
    animation: `${spinAnimation} 1.4s linear infinite`,
    '& circle': {
      animation: `${strokeDashAnimation} 1.4s ease-in-out infinite`,
    },
  } as const;
}
