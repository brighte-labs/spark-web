import { css, keyframes } from '@emotion/css';
import { Box } from '@spark-web/box';
import { createIcon } from '@spark-web/icon';
import { BrighteTheme, useTheme } from '@spark-web/theme';

// maybe add more tone types
type LoaderTone = keyof BrighteTheme['color']['foreground'];
type SizeType = 'xxsmall' | 'xsmall';

export type LoaderProps = {
  tone?: LoaderTone,
  size?: SizeType
}

export const Loader = ({tone = 'primary', size='xsmall'}: LoaderProps)=>{
  const styles = useLoaderStyles(tone);
  return (
    <Box className={css(styles)} height={size} width={size}>
      <SpinnerIcon size={size}/>
    </Box>
  );

};
Loader.displayName = 'Loader';

const SpinnerIcon = createIcon(<path
  d="M12 20.5a1.5 1.5 0 000 3v-3zM.5 12a1.5 1.5 0 003 0h-3zm20 0a8.5 8.5 0 01-8.5 8.5v3c6.351 0 11.5-5.149 11.5-11.5h-3zm-17 0A8.5 8.5 0 0112 3.5v-3C5.649.5.5 5.649.5 12h3zM12 3.5a8.5 8.5 0 018.5 8.5h3C23.5 5.649 18.351.5 12 .5v3z"
/>, 'SpinnerIcon');

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)'  },
});

const  useLoaderStyles =  (tone:LoaderTone) => {
  const theme = useTheme();
  return{
    colour: theme.color.foreground.accent,
    animation: `${spin} 1.4s ease-in-out infinite`,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    '> svg': {
      stroke: 'none',
      strokeLinecap: 'round',
      fill: theme.color.foreground[tone]
    }
  } as const;
}