---
title: Heading
storybookPath: typography-heading--default
isExperimentalPackage: false
---

Constrained, purposeful heading styles as a component.

```jsx live
<Stack gap="xlarge">
  <Heading level="1">Heading level 1</Heading>
  <Heading level="2">Heading level 2</Heading>
  <Heading level="3">Heading level 3</Heading>
  <Heading level="4">Heading level 4</Heading>
</Stack>
```

## Example

### Alignment

Text can be aligned with the `align` prop.

```jsx live
<Stack gap="small" dividers>
  <Heading level="3" align="left">
    Left (default)
  </Heading>
  <Heading level="3" align="center">
    Center
  </Heading>
  <Heading level="3" align="right">
    Right
  </Heading>
</Stack>
```

### Truncation

Truncate text to a single line using the `truncate` prop. Useful for displaying
user-generated content that may not fit within your layout.

```jsx live
<Stack gap="large" style={{ width: 200 }}>
  <Heading level="3" truncate>
    The quick brown fox jumps over the lazy
  </Heading>
</Stack>
```

### Contrast

To ensure headings have sufficient contrast, when on a dark background the
foreground colour is inverted.

```jsx live
<Box background="neutral" padding="large" borderRadius="small">
  <Heading level="3">This Heading is inverted to improve contrast.</Heading>
</Box>
```

## Props

| Prop      | Type                                   | Default | Description                                         |
| --------- | -------------------------------------- | ------- | --------------------------------------------------- |
| children  | React.ReactNode                        |         | Content to be rendered as the heading.              |
| id?       | string                                 |         | Sets a unique identifier for the element.           |
| truncate? | boolean                                |         | Indicate whether to truncate text to a single line. |
| data?     | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component.              |

Extra props are passed into the underlying [`Box`](/package/box) component.

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
