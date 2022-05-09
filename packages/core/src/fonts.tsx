/**
 * TODO: the CSS file that loads Aestetico is a bit of a hack as it relies on the atomic deploys never changing
 * we should host this file on the brighte.com.au domain (or subdomain) in the future
 */
export function AesteticoStylesheet(): JSX.Element {
  return (
    <link
      rel="stylesheet"
      href="https://spark-web-docs-fa4i8lp4e-brighte.vercel.app/fonts.css"
    />
  );
}
