import { Global } from '@emotion/react';

export function AesteticoStylesheet(): JSX.Element {
  return <Global styles={fonts} />;
}

const fonts = `
@import "//hello.myfonts.net/count/46e60e";
@font-face {
  font-family: Aestetico;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://static-assets.prod.cloud.brighte.com.au/fonts/Aestetico-Regular.woff2) format("woff2");
}
@font-face {
  font-family: Aestetico;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://static-assets.prod.cloud.brighte.com.au/fonts/Aestetico-SemiBold.woff2) format("woff2");
}
`.trim();
