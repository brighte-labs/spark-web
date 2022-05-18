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
  src: url(https://spark-web-docs-fa4i8lp4e-brighte.vercel.app/fonts/aestetico-regular.woff2) format("woff2");
}
@font-face {
  font-family: Aestetico;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://spark-web-docs-fa4i8lp4e-brighte.vercel.app/fonts/aestetico-semibold.woff2) format("woff2");
}
`.trim();
