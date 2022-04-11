import { css } from '@emotion/css';
import { Box, useTheme } from '@spark-web/core';

import { Highlight } from './highlight';
import { ReactLive } from './react-live';

type CodeBlockProps = {
  className?: string;
  code: string;
  demo?: boolean; // only render the result, not the code itself
  metastring?: string;
} & (
  | {
      initialCompiledResult: string;
      live: true;
      scope: { [key: string]: any };
    }
  | {
      initialCompiledResult?: never;
      live?: never;
      scope?: never;
    }
);

export function CodeBlock({
  className = 'language-jsx',
  code,
  demo,
  initialCompiledResult,
  live,
  metastring,
  scope,
}: CodeBlockProps): JSX.Element {
  const { color, border } = useTheme();

  const language = className?.replace(/language-/, '');
  if (live && initialCompiledResult && scope) {
    return (
      <ReactLive
        code={code}
        demo={demo}
        initialCompiledResult={initialCompiledResult}
        scope={scope}
      />
    );
  }

  return (
    <Box
      as="pre"
      className={css({
        background: color.background.surfaceMuted,
        borderRadius: border.radius.small,
        boxShadow: `0 0 0 1px ${border.color.standard}`,
        // TODO: add monospace font to tokens
        fontFamily: 'Monaco, Consolas, monospace',
        // TODO: use theme
        fontSize: '0.875rem',
        color: color.foreground.neutral,
        // TODO: use theme
        lineHeight: 1.4,
        maxWidth: '100%',
        overflow: 'auto',
        // TODO: use theme
        padding: 10,

        code: {
          fontFamily: 'inherit',
        },
      })}
    >
      <Highlight metastring={metastring} code={code} language={language} />
    </Box>
  );
}
