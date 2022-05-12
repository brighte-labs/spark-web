---
title: Text
storybookPath: typography-text--default
---

Constrained, purposeful text styles as a component.

## Examples

```jsx live
<Columns gap="large" collapseBelow="wide">
  <Stack gap="medium">
    <Text size="large">large regular</Text>
    <Text size="large" weight="medium">
      large medium
    </Text>
    <Text size="large" weight="strong">
      large strong
    </Text>
  </Stack>
  <Stack gap="medium">
    <Text size="standard">standard regular</Text>
    <Text size="standard" weight="medium">
      standard medium
    </Text>
    <Text size="standard" weight="strong">
      standard strong
    </Text>
  </Stack>
  <Stack gap="small">
    <Text size="small">small regular</Text>
    <Text size="small" weight="medium">
      small medium
    </Text>
    <Text size="small" weight="strong">
      small strong
    </Text>
  </Stack>
  <Stack gap="small">
    <Text size="xsmall">xsmall regular</Text>
    <Text size="xsmall" weight="medium">
      xsmall medium
    </Text>
    <Text size="xsmall" weight="strong">
      xsmall strong
    </Text>
  </Stack>
</Columns>
```

### Align

Text can be aligned with the `align` prop.

```jsx live
<Stack gap="large" dividers>
  <Text align="left">Left (default)</Text>
  <Text align="center">Center</Text>
  <Text align="right">Right</Text>
</Stack>
```

### Overflow strategy

Use the `overflowStrategy` prop to manage how `Text` behaves with regard to
overflow.

```jsx live
<Stack gap="large" style={{ width: 200 }}>
  <Stack gap="small">
    <Text weight="strong">Default</Text>
    <Text>The quick brown fox jumps over the lazy dog.</Text>
  </Stack>
  <Stack gap="small">
    <Text weight="strong">Truncate</Text>
    <Text overflowStrategy="truncate">
      The quick brown fox jumps over the lazy dog.
    </Text>
  </Stack>
  <Stack gap="small">
    <Text weight="strong">No wrap</Text>
    <Text overflowStrategy="nowrap">
      The quick brown fox jumps over the lazy dog.
    </Text>
  </Stack>
  <Stack gap="small">
    <Text weight="strong">Break word</Text>
    <Text overflowStrategy="breakword">
      The_quick_brown_fox_jumps_over_the_lazy dog.
    </Text>
  </Stack>
</Stack>
```

### Tone

The foreground colour of text can be set by applying a `tone`. In addition to
the foundation tones, “muted” provides a way to de-emphasise text.

```jsx live
<Inline gap="small">
  <Text tone="neutral">neutral (default)</Text>
  <Text tone="muted">muted</Text>
  <Text tone="info">info</Text>
  <Text tone="positive">positive</Text>
  <Text tone="caution">caution</Text>
  <Text tone="critical">critical</Text>
</Inline>
```

### Contrast

To ensure text has sufficient contrast, when on a dark background the foreground
tones “neutral” and “muted” will be inverted.

```jsx live
<Inline gap="large">
  <Box background="neutral" padding="small" borderRadius="small">
    <Text>neutral</Text>
  </Box>
  <Box background="neutral" padding="small" borderRadius="small">
    <Text tone="muted">muted</Text>
  </Box>
</Inline>
```

## Props

| Prop              | Type                                   | Default | Description                                                                  |
| ----------------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| children          | React.ReactNode                        |         | The text content to be rendered.                                             |
| id?               | string                                 |         | Sets a unique idenitifier for the component.                                 |
| tabularNumbers?   | boolean                                |         | When enabled, numbers will be the same width. Similar to a monospaced font.  |
| transform?        | CSSProperties['textTransform']         |         | Transforms the text casing.                                                  |
| align?            | 'left' \| 'center' \| 'right'          |         | Sets the horizontal alignment of the component. Used if displaying as block. |
| inline?           | boolean                                |         | Indicates if text should be inline or not.                                   |
| overflowStrategy? | 'nowrap' \| 'truncate' \| 'breakword'  |         | Sets how text behaves with regards to overflow. Used if displaying as block. |
| data?             | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component.                                       |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
