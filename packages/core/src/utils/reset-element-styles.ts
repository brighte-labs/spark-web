import type { ElementType } from 'react';

export const base = {
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
} as const;

// HTML5 display-role reset for older browsers
const block = { display: 'block' };

const body = { lineHeight: 1 };

const list = { listStyle: 'none' };

const quote = { quotes: 'none' };

const table = { borderCollapse: 'collapse', borderSpacing: 0 } as const;

const transparent = { backgroundColor: 'transparent' };

const field = Object.assign({}, block, transparent, {
  appearance: 'none',
} as const);

// Custom reset rules
const mark = Object.assign({}, transparent, { color: 'inherit' });

const select = Object.assign({}, field, {
  ':disabled': { opacity: 1 },
  '&::-ms-expand': { display: 'none' },
});

const input = Object.assign({}, field, {
  '&::-ms-clear': {
    display: 'none',
  },
  '&::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
  },
});

const button = Object.assign({}, transparent);

const a = {
  textDecoration: 'none',
  color: 'inherit',
};

export const element = {
  article: block,
  aside: block,
  details: block,
  figcaption: block,
  figure: block,
  footer: block,
  header: block,
  hgroup: block,
  menu: block,
  nav: block,
  section: block,
  ul: list,
  ol: list,
  blockquote: quote,
  q: quote,
  body,
  a,
  table,
  mark,
  select,
  button,
  textarea: field,
  input,
} as const;

// TODO: supporting `ElementType` (because of "as" prop) is messy. Ideally this
// would strictly accept HTML elements
export function resetElementStyles(keyOrComponent: string | ElementType) {
  if (typeof keyOrComponent !== 'string') {
    return base;
  }
  if (keyOrComponent in element) {
    const elementStyles = element[keyOrComponent as keyof typeof element];
    return { ...base, ...elementStyles };
  }

  return base;
}
