---
title: Row
storybookPath: page-layout-row--default
isExperimentalPackage: false
---

Used to distribute children horizontally, with even spacing between each child.

```jsx live
<Row gap="large">
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Row>
```

## Examples

### Gap

The spacing between children can be adjusted using the `gap` prop.

```jsx live
<Inline gap="xxlarge">
  <Row gap="small">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Row>
  <Row gap="medium">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Row>
  <Row gap="large">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Row>
  <Row gap="xlarge">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Row>
</Inline>
```

### Vertical alignment

Items can be aligned vertically using the `alignY` prop.

```jsx live
<Stack gap="medium" align="center" dividers>
  <Row gap="small" alignY="top">
    <Placeholder />
    <Placeholder label="top" height={64} width={128} />
    <Placeholder />
  </Row>
  <Row gap="small" alignY="center">
    <Placeholder />
    <Placeholder label="center" height={64} width={128} />
    <Placeholder />
  </Row>
  <Row gap="small" alignY="bottom">
    <Placeholder />
    <Placeholder label="bottom" height={64} width={128} />
    <Placeholder />
  </Row>
  <Row gap="small" alignY="stretch">
    <Placeholder />
    <Placeholder label="stretch" height={64} width={128} />
    <Placeholder />
  </Row>
</Stack>
```

### Horizontal alignment

Items can be aligned horizontally using the `align` prop.

```jsx live
<Stack gap="medium" dividers>
  <Row gap="small" align="left">
    <Placeholder label="left" width={128} />
    <Placeholder />
    <Placeholder />
  </Row>
  <Row gap="small" align="center">
    <Placeholder />
    <Placeholder label="center" width={128} />
    <Placeholder />
  </Row>
  <Row gap="small" align="right">
    <Placeholder />
    <Placeholder />
    <Placeholder label="right" width={128} />
  </Row>
</Stack>
```

### Dividers

Use the `dividers` property to render a [Divider](/package/divider) between each
element in the Row.

```jsx live
<Row gap="medium" dividers>
  <Text>First item</Text>
  <Text>Second item</Text>
  <Text>Third item</Text>
</Row>
```

## Props

| Prop      | Type                                   | Default   | Description                                           |
| --------- | -------------------------------------- | --------- | ----------------------------------------------------- |
| align?    | [ResponsiveProp\<Align>][align]        | 'left'    | Horizontally align items within the container.        |
| alignY?   | [ResponsiveProp\<AlignY>][align-y]     | 'stretch' | Vertically align items within the container.          |
| dividers? | boolean                                |           | Sets whether to place a divider between each element. |
| data?     | [DataAttributeMap][data-attribute-map] |           | Sets data attributes on the component.                |

`Row` props also include [`Box`](/package/box) props and are not listed here
(excludes `display`, `alignItems`, `flexDirection`, `justifyContent` and
`flexWrap`).

Extra props are also passed into the underlying [`Box`](/package/box) component.

[align]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/inline/src/Inline.tsx#L16
[align-y]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/inline/src/Inline.tsx#L18
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
