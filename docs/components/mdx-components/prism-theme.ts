// Duotone Light
// Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
// Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
// Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)

import type { PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
  plain: {},
  styles: [
    {
      types: ['cdata', 'comment', 'doctype', 'prolog'],
      style: {
        color: '#959daa',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#5a6270',
      },
    },
    {
      types: [
        'boolean',
        'constant',
        'deleted',
        'number',
        'property',
        'symbol',
        'tag',
      ],
      style: {
        color: '#f25cc1',
      },
    },
    {
      types: ['attr-name', 'builtin', 'char', 'inserted', 'selector', 'string'],
      style: {
        color: '#26a29d',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#6554c0',
      },
    },
    {
      types: ['class-name', 'function'],
      style: {
        color: '#f25cc1',
      },
    },
    {
      types: ['important', 'regex', 'variable'],
      style: {
        color: '#f4d03f',
      },
    },
    {
      types: ['bold', 'important'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
};
