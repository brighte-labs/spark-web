/**
 * TODO: the CSS file that loads Aesthetico is a bit of a hack as it relies on the atomic deploys never changing
 * we should host this file on the brighte.com.au domain (or subdomain) in the future
 */
export function AestheticoStylesheet(): JSX.Element {
  return (
    <link
      rel="stylesheet"
      href="https://spark-web-docs-5at71kbus-brighte.vercel.app/_next/static/css/b1c6707967e86a27.css"
    />
  );
}

export function InterStylesheet(): JSX.Element {
  return (
    // This should only be used inside of `_document` in a Next.js app
    // eslint-disable-next-line @next/next/no-page-custom-font
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&display=swap"
    />
  );
}

export function FontStylesheets(): JSX.Element {
  return (
    <>
      <AestheticoStylesheet />
      <InterStylesheet />
    </>
  );
}
