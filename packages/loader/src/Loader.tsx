import { css, keyframes } from '@emotion/css';
import { Box } from '@spark-web/box';
import { createIcon } from '@spark-web/icon';
import { useSynchronizedAnimation } from '@spark-web/utils';

// maybe add more tone types
type SizeType = 'medium' | 'large';

export type LoaderProps = {
  tone?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'caution'
    | 'critical'
    | 'info'
    | 'positive';
  size?: SizeType;
};

const mapSize = {
  medium: 'xxsmall',
  large: 'xsmall',
} as const;

export const Loader = ({ tone, size: sizeProp = 'medium' }: LoaderProps) => {
  let ref = useSynchronizedAnimation(spinAnimation);
  const styles = useLoaderStyles();
  const size = mapSize[sizeProp];

  return (
    <Box
      as="span"
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      height={size}
      width={size}
      className={css(styles)}
    >
      <SpinnerIcon size={size} tone={tone} />
    </Box>
  );
};
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

const useLoaderStyles = () => {
  return {
    animation: `${spinAnimation} 1.4s ease-in-out infinite`,
    '> svg': {
      fill: 'none',
      strokeLinecap: 'round',
    },
  } as const;
};
