import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useHeading } from '@spark-web/heading';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

export function MdxTable({
  children,
  ...rest
}: {
  children: ReactNode;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Box
      background="surfaceMuted"
      className={css({
        borderRadius: theme.border.radius.small,
        border: `1px solid ${theme.border.color.standard}`,
        overflowX: 'auto',
      })}
    >
      <Box
        as="table"
        className={css({
          width: '100%',
          overflow: 'auto',
          borderCollapse: 'collapse',
        })}
        {...rest}
      >
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '40%' }} />
        </colgroup>
        {children}
      </Box>
    </Box>
  );
}

export function MdxThead({
  children,
  ...rest
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Box as="thead" background="surface" {...rest}>
      {children}
    </Box>
  );
}

export function MdxTr({
  children,
  ...rest
}: {
  children: ReactNode;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Box
      as="tr"
      className={css({
        borderTop: `1px solid ${theme.border.color.field}`,
        ':first-child': {
          border: 'none',
        },
        ':nth-child(even)': {
          backgroundColor: theme.color.background.surface,
        },
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function MdxTh({
  children,
  ...rest
}: {
  children: ReactNode;
}): JSX.Element {
  const { border, spacing } = useTheme();
  const textStyles = useHeading({ align: 'left', level: '4' });
  return (
    <Box
      as="th"
      className={css(textStyles, {
        padding: spacing.large,
        'thead &': {
          borderBottom: `1px solid ${border.color.field}`,
        },
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function MdxTd({
  children,
  ...rest
}: {
  children: ReactNode;
}): JSX.Element {
  const theme = useTheme();
  return (
    <Box
      as="td"
      className={css({
        padding: theme.spacing.large,
        verticalAlign: 'baseline',
      })}
      {...rest}
    >
      <Text>{children}</Text>
    </Box>
  );
}
