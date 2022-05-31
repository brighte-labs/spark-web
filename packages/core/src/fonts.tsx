import { Global } from '@emotion/react';

export const AESTETICO_REGULAR_URL =
  'https://static-assets.prod.cloud.brighte.com.au/fonts/Aestetico-Regular.woff2';
export const AESTETICO_SEMIBOLD_URL =
  'https://static-assets.prod.cloud.brighte.com.au/fonts/Aestetico-SemiBold.woff2';

const styles = `
@import "//hello.myfonts.net/count/46e60e";

@font-face {
  font-family: Aestetico;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${AESTETICO_REGULAR_URL}) format("woff2");
}

@font-face {
  font-family: Aestetico;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(${AESTETICO_SEMIBOLD_URL}) format("woff2");
}
`.trim();

export function AesteticoStylesheet(): JSX.Element {
  return <Global styles={styles} />;
}
