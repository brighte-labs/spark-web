import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Columns } from '@spark-web/columns';
import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { isLight, useTheme } from '@spark-web/theme';

import { DocsContent } from '../components/content';
import { InlineCode } from '../components/example-helpers';

export default function Packages(): JSX.Element {
  const theme = useTheme();
  const colors = [
    {
      id: 'foreground',
      title: 'Foreground',
      level: 2,
      slug: 'foreground',
      colors: theme.color.foreground,
    },
    {
      id: 'background',
      title: 'Background',
      level: 2,
      slug: 'background',
      colors: theme.color.background,
    },
    {
      id: 'border',
      title: 'Border',
      level: 2,
      slug: 'border',
      colors: theme.border.color,
    },
    {
      id: 'backgroundInteractions',
      title: 'Background Interactions',
      level: 2,
      slug: 'backgroundInteractions',
      colors: theme.backgroundInteractions,
    },
  ];

  return (
    <DocsContent
      pageTitle="Colours"
      includeNavigation
      toc={colors.map(color => ({ ...color, items: [] }))}
    >
      <Stack gap="xlarge">
        {colors.map(({ colors, slug, title }) => (
          <Stack key={slug} gap="xlarge">
            <Heading id={slug} level="2">
              {title}
            </Heading>
            <Columns
              gap="large"
              template={[1, 1, 1, 1]}
              collapseBelow="desktop"
            >
              {Object.entries(colors).map(([key, value]) => (
                <Stack gap="small" key={key}>
                  <Text weight="medium">{key}</Text>
                  <Swatch backgroundColor={value} />
                  <Text weight="medium">
                    <InlineCode>{value}</InlineCode>
                  </Text>
                </Stack>
              ))}
            </Columns>
          </Stack>
        ))}
      </Stack>
    </DocsContent>
  );
}

function Swatch({ backgroundColor }: { backgroundColor: string }) {
  const theme = useTheme();
  const foregroundColor = isLight(backgroundColor)
    ? theme.color.foreground.neutral
    : theme.color.foreground.neutralInverted;

  return (
    <Box
      height="large"
      className={css({
        background: backgroundColor,
        color: foregroundColor,
        minWidth: theme.sizing.large,
      })}
    />
  );
}
