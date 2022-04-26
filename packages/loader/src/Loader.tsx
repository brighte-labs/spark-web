import { css, keyframes } from '@emotion/css';
import type { IconProps } from '@spark-web/icon';
import { createIcon } from '@spark-web/icon';
import { useSynchronizedAnimation } from '@spark-web/utils';

export type LoaderProps = {
  // TODO: match tones to design in Figma
  tone?: IconProps['tone'];
  size?: 'xxsmall' | 'xsmall';
};

export function Loader({ tone, size = 'xxsmall' }: LoaderProps) {
  let animationRef = useSynchronizedAnimation(spinAnimation);
  const styles = useLoaderStyles();

  return (
    <SpinnerIcon
      ref={animationRef}
      size={size}
      tone={tone}
      className={css(styles)}
    />
  );
}
Loader.displayName = 'Loader';

const SpinnerIcon = createIcon(
  <circle cx={12} cy={12} r={10} fill="none" strokeWidth={3} />,
  'SpinnerIcon'
);

const spinAnimation = keyframes({
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
    animation: `${spinAnimation} 1.4s ease-in-out infinite`,
    strokeLinecap: 'round',
  } as const;
}
