---
title: Text
storybookPath: typography-text--default
isExperimentalPackage: false
---

Constrained, purposeful text styles as a component.

## Examples

```jsx live
<Columns gap="large" collapseBelow="wide">
  <Stack gap="medium">
    <Text size="large">large regular</Text>
    <Text size="large" weight="semibold">
      large medium
    </Text>
    <Text size="large" weight="strong">
      large strong
    </Text>
  </Stack>
  <Stack gap="medium">
    <Text size="standard">standard regular</Text>
    <Text size="standard" weight="semibold">
      standard medium
    </Text>
    <Text size="standard" weight="strong">
      standard strong
    </Text>
  </Stack>
  <Stack gap="small">
    <Text size="small">small regular</Text>
    <Text size="small" weight="semibold">
      small medium
    </Text>
    <Text size="small" weight="strong">
      small strong
    </Text>
  </Stack>
  <Stack gap="small">
    <Text size="xsmall">xsmall regular</Text>
    <Text size="xsmall" weight="semibold">
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

### Weight

Text is available in two weight: `regular` and `semibold`.

```jsx live
<Inline gap="small">
  <Text weight="regular">Regular</Text>
  <Text weight="semibold">Semibold</Text>
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

| Prop              | Type                                                            | Default | Description                                                                  |
| ----------------- | --------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| align?            | 'left' \| 'center' \| 'right'                                   |         | Sets the horizontal alignment of the component. Used if displaying as block. |
| children          | React.ReactNode                                                 |         | The text content to be rendered.                                             |
| data?             | [DataAttributeMap][data-attribute-map]                          |         | Sets data attributes on the component.                                       |
| id?               | string                                                          |         | Sets a unique idenitifier for the component.                                 |
| inline?           | boolean                                                         |         | Indicates if text should be inline or not.                                   |
| overflowStrategy? | 'nowrap' \| 'truncate' \| 'breakword'                           |         | Sets how text behaves with regards to overflow. Used if displaying as block. |
| tabularNumbers?   | boolean                                                         |         | When enabled, numbers will be the same width. Similar to a monospaced font.  |
| tone?             | keyof [BrighteTheme][brighte-theme]['color']['foreground']      |         | The tone of the text.                                                        |
| transform?        | CSSProperties['textTransform']                                  |         | Transforms the text casing.                                                  |
| weight?           | keyof [BrighteTheme][brighte-theme]['typography']['fontweight'] |         | The weight of the text.                                                      |

[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
