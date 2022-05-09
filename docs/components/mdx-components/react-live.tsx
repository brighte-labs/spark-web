import type { CSSObject } from '@emotion/css';
import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Button, ButtonLink } from '@spark-web/button';
import { ClipboardIcon, PlayIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { useLiveCode } from '@untitled-docs/live-code';
import copy from 'clipboard-copy';
import { createUrl } from 'playroom/utils';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';

import { hexToRgb } from '../../utils/colors';
import { Highlight } from './highlight';

const useCodeStyles = () => {
  const { color } = useTheme();

  return {
    backgroundColor: color.background.surfaceMuted,
    color: color.foreground.primary,
    // TODO: add monospace font to tokens
    fontFamily: 'Monaco, Consolas, monospace',
    // TODO: use theme
    fontSize: '0.875rem',
    lineHeight: 1.4,
    maxWidth: '100%',

    code: {
      fontFamily: 'inherit',
    },
  };
};

const highlightCode = (code: string) => (
  <Highlight code={code} language="jsx" />
);

function Controls({
  code,
  exampleType,
}: {
  code: string;
  exampleType: 'jsx' | 'function';
}) {
  const playroomUrl = createUrl({
    baseUrl: process.env.NEXT_PUBLIC_PLAYROOM_URL,
    code:
      exampleType === 'jsx'
        ? code
        : `<Render>\n  {() => {\n    ${code
            .split('\n')
            .join('\n    ')}\n  }}\n</Render>`,
  });

  return (
    <Stack dividers>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="spaceBetween"
        paddingX="medium"
        paddingY="small"
      >
        <Box
          display="flex"
          alignItems="center"
          gap="small"
          className={css({ marginLeft: 'auto' })}
        >
          <ButtonLink tone="neutral" prominence="none" href={playroomUrl}>
            <PlayIcon />
            Open in Playroom
          </ButtonLink>
          <Button tone="neutral" prominence="none" onClick={() => copy(code)}>
            <ClipboardIcon />
            Copy Code
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

function RenderedCodeExample({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: CSSObject;
}) {
  const { color, border } = useTheme();
  return (
    <Box
      className={css({
        background: color.background.surface,
        borderRadius: border.radius.small,
        boxShadow: `0 0 0 1px ${border.color.standard}`,
        overflow: 'auto',
        ...styles,
      })}
    >
      {children}
    </Box>
  );
}

function ErrorMessage({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: CSSObject;
}) {
  const { color, border } = useTheme();
  return (
    <Box
      className={css({
        backgroundColor: color.background.criticalMuted,
        borderBottomLeftRadius: border.radius.small,
        borderBottomRightRadius: border.radius.small,
        margin: 0,
        maxWidth: '100%',
        ...styles,
      })}
    >
      <Text tone="critical">
        <Box
          as="pre"
          className={css({
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          })}
        >
          {children}
        </Box>
      </Text>
    </Box>
  );
}

export function ReactLive({
  code,
  demo,
  scope,
  initialCompiledResult,
}: {
  code: string;
  demo?: boolean;
  scope: { [key: string]: any };
  initialCompiledResult: string;
}): JSX.Element {
  const collapsible = useRef(false);
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [liveCode, setLiveCode] = useState(code);
  const { color, border, sizing, spacing, typography } = useTheme();
  const { element, error, latestSuccessfulCompiledResult } = useLiveCode({
    code: liveCode,
    scope,
    initialCompiledResult: () => JSON.parse(initialCompiledResult),
  });

  const codeStyles = useCodeStyles();

  const gutter = spacing.large;
  const COLLAPSE_BUTTON_HEIGHT = sizing.medium;
  const COLLAPSED_HEIGHT = 200;

  useEffect(() => {
    const el = editorWrapperRef.current;

    if (el && el.scrollHeight > COLLAPSED_HEIGHT + COLLAPSE_BUTTON_HEIGHT) {
      collapsible.current = true;
    }
  }, [COLLAPSE_BUTTON_HEIGHT]);
  if (demo) {
    return (
      <RenderedCodeExample styles={{ padding: gutter }}>
        {element}
      </RenderedCodeExample>
    );
  }

  return (
    <Box
      className={css({
        borderRadius: border.radius.small,
        boxShadow: `0 0 0 1px ${border.color.standard}`,
      })}
    >
      <Stack dividers>
        <RenderedCodeExample
          styles={{
            padding: gutter,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          {element}
        </RenderedCodeExample>
        {latestSuccessfulCompiledResult && (
          <Controls
            exampleType={latestSuccessfulCompiledResult.exampleType}
            code={liveCode}
          />
        )}
        <Box
          ref={editorWrapperRef}
          className={css({
            overflow: 'hidden',
            borderBottomLeftRadius: border.radius.small,
            borderBottomRightRadius: border.radius.small,
            position: 'relative',
            maxHeight:
              collapsible.current && collapsed ? COLLAPSED_HEIGHT : undefined,
            paddingBottom:
              collapsible.current && !collapsed
                ? COLLAPSE_BUTTON_HEIGHT
                : undefined,
          })}
        >
          <Editor
            value={liveCode}
            padding={spacing.large}
            highlight={highlightCode}
            onValueChange={setLiveCode}
            className={css({
              ...codeStyles,
              ...(error
                ? {}
                : {
                    borderBottomLeftRadius: border.radius.small,
                    borderBottomRightRadius: border.radius.small,
                  }),
            })}
          />
          {collapsible.current && (
            <button
              className={css({
                background: color.background.surfaceMuted,
                border: 0,
                bottom: 0,
                borderBottomLeftRadius: border.radius.small,
                borderBottomRightRadius: border.radius.small,
                boxSizing: 'border-box',
                color: color.foreground.muted,
                cursor: 'pointer',
                // TODO: use theme
                fontSize: '0.875rem',
                fontWeight: typography.fontWeight.medium,
                height: COLLAPSE_BUTTON_HEIGHT,
                left: 0,
                padding: 0,
                position: 'absolute',
                textTransform: 'uppercase',
                width: '100%',

                ':hover, &.focus-visible': {
                  background: color.background.surfaceMuted,
                  color: color.foreground.muted,
                },

                ':before':
                  collapsible.current && collapsed
                    ? {
                        background: `linear-gradient(${hexToRgb(
                          color.background.surfaceMuted,
                          0.01
                        )} 50%, ${color.background.surfaceMuted})`,
                        content: '" "',
                        height: COLLAPSED_HEIGHT,
                        position: 'absolute',
                        bottom: COLLAPSE_BUTTON_HEIGHT,
                        left: 0,
                        right: 0,
                      }
                    : {},
              })}
              onClick={() => setCollapsed(v => !v)}
            >
              Show {collapsed ? 'more' : 'less'}
            </button>
          )}
        </Box>
      </Stack>
      {error && (
        <ErrorMessage styles={{ padding: gutter }}>{error}</ErrorMessage>
      )}
    </Box>
  );
}
