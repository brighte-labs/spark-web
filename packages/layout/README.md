---
title: Layout
storybookPath: page-layout-columns--default
---

## Columns

Use the columns primitive to layout content in configurable columns.

Each child represents a single column. By default that column will span 1
fraction of the total number of children.

```jsx live
<Columns>
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Columns>
```

## Examples

### Gap

The spacing between children can be adjusted using the `gap` prop.

```jsx live
<Columns gap="large">
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Columns>
```

### Vertical alignment

Columns can be aligned vertically using the `alignY` prop.

```jsx live
<Stack gap="medium" dividers>
  <Columns gap="small" alignY="top">
    <Placeholder />
    <Placeholder label="top (default)" height={64} />
    <Placeholder />
  </Columns>
  <Columns gap="small" alignY="center">
    <Placeholder />
    <Placeholder label="center" height={64} />
    <Placeholder />
  </Columns>
  <Columns gap="small" alignY="bottom">
    <Placeholder />
    <Placeholder label="bottom" height={64} />
    <Placeholder />
  </Columns>
  <Columns gap="small" alignY="stretch">
    <Placeholder />
    <Placeholder label="stretch" height={64} />
    <Placeholder />
  </Columns>
</Stack>
```

### Collapsing across breakpoints

Columns can be collapsed into a single vertical stack responsively using the
`collapseBelow` prop.

```jsx live
<Columns gap="large" collapseBelow="desktop">
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Columns>
```

## Props

| Prop           | Type                                                    | Default | Description                                                                            |
| -------------- | ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| alignY?        | [ResponsiveProp][responsive-prop]<AlignY\>              |         | Vertically align items within the container.                                           |
| children       | React.ReactNode                                         |         | Children elements to be rendered within the column component representing each column. |
| collapseBelow? | [ResponsiveRangeProps][responsive-range-props]('below') |         | At which breakpoint, if amy, should the columns collapse.                              |
| gap?           | [Gap][gap]                                              |         | The size of the gap between each column.                                               |
| template?      | number[]                                                |         | Define the relative width of each column. By default each column is the same width.    |

[`Box`](/package/box) props are also included as `Column` props and are not
listed here (excluding `display`, `alignItems`, `gap`, `flexDirection`,
`justifyContent` and `flexWrap`).

Extra props are passed into the underlying [`Box`](/package/box) component.

[responsive-prop]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/theme/src/themeUtils.ts#spark-web/packages/theme/src/themeUtils.ts-11
[responsive-range-props]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/theme/src/themeutils.ts#spark-web/packages/theme/src/themeutils.ts-130
[gap]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/columns/src/Columns.tsx#spark-web/packages/columns/src/Columns.tsx-14

## Container

storybookPath: `page-layout-container--default`

The container centers and constrains the maximum width of the content it wraps.

```jsx live
<Container size="small">
  <Placeholder height={64} />
</Container>
```

## Examples

### Size

Use the `size` prop to adjust the maximum width of the container.

```jsx live
<Stack gap="large">
  <Container size="xsmall">
    <Placeholder label="xsmall" height={64} />
  </Container>
  <Container size="small">
    <Placeholder label="small" height={64} />
  </Container>
  <Container size="medium">
    <Placeholder label="medium" height={64} />
  </Container>
  <Container size="large">
    <Placeholder label="large" height={64} />
  </Container>
</Stack>
```

## Props

| Prop     | Type                                                | Default | Description                                            |
| -------- | --------------------------------------------------- | ------- | ------------------------------------------------------ |
| children | React.ReactNode                                     |         | Children elements to be rendered inside the container. |
| data?    | [DataAttributeMap][data-attribute-map]              |         | Sets data attributes on the element.                   |
| size?    | keyof [BrighteTheme][brighte-theme]['contentWidth'] |         | Sets the size of the container.                        |

[data-attribute-map]:
  https://bitbucket.org/brighte-energy/energy/src/14a694872cc43bb454981bada65f5f12b56f77c9/spark-web/packages/utils-spark/src/buildDataAttributes.ts#spark-web/packages/utils-spark/src/buildDataAttributes.ts-1
[brighte-theme]:
  https://bitbucket.org/brighte-energy/energy/src/24cfd1fbc07ea0f737a4580df8b20e970a32e369/spark-web/packages/theme/src/maketheme.ts#spark-web/packages/theme/src/maketheme.ts-173

## Inline

storybookPath: `page-layout-inline--default`

Use to layout a group of elements together, and allow them to wrap onto multiple
lines.

```jsx live
<Inline gap="large">
  <Placeholder width={128} />
  <Placeholder width={32} />
  <Placeholder width={64} />
  <Placeholder width={256} />
  <Placeholder width={128} />
  <Placeholder width={32} />
  <Placeholder width={64} />
  <Placeholder width={128} />
  <Placeholder width={32} />
  <Placeholder width={64} />
  <Placeholder width={256} />
</Inline>
```

## Examples

### Gap

The spacing between children can be adjusted using the `gap` prop.

```jsx live
<Inline gap="xxlarge">
  <Inline gap="small">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Inline>
  <Inline gap="medium">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Inline>
  <Inline gap="large">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Inline>
  <Inline gap="xlarge">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Inline>
</Inline>
```

### Vertical alignment

Items can be aligned vertically using the `alignY` prop.

```jsx live
<Stack gap="medium" align="center" dividers>
  <Inline gap="small" alignY="top">
    <Placeholder />
    <Placeholder label="top" height={64} width={128} />
    <Placeholder />
  </Inline>
  <Inline gap="small" alignY="center">
    <Placeholder />
    <Placeholder label="center" height={64} width={128} />
    <Placeholder />
  </Inline>
  <Inline gap="small" alignY="bottom">
    <Placeholder />
    <Placeholder label="bottom" height={64} width={128} />
    <Placeholder />
  </Inline>
</Stack>
```

### Horizontal alignment

Items can be aligned horizontally using the `align` prop.

```jsx live
<Stack gap="medium" dividers>
  <Inline gap="small" align="left">
    <Placeholder label="left" width={128} />
    <Placeholder />
    <Placeholder />
  </Inline>
  <Inline gap="small" align="center">
    <Placeholder />
    <Placeholder label="center" width={128} />
    <Placeholder />
  </Inline>
  <Inline gap="small" align="right">
    <Placeholder />
    <Placeholder />
    <Placeholder label="right" width={128} />
  </Inline>
</Stack>
```

## Props

| Prop    | Type                               | Default | Description                                    |
| ------- | ---------------------------------- | ------- | ---------------------------------------------- |
| align?  | [ResponsiveProp<Align\>][align]    | 'left'  | Horizontally align items within the container. |
| alignY? | [ResponsiveProp<AlignY\>][align-y] | 'top'   | Vertically align items within the container.   |

[`Box`](/package/box) props are also included as `Inline` props and are not
listed here (excluding `display`, `alignItems`, `flexDirection`,
`justifyContent` and `flexWrap`).

[align]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-20
[align-y]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-22

## Row

storybookPath: `page-layout-row--default`

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

| Prop      | Type                               | Default   | Description                                           |
| --------- | ---------------------------------- | --------- | ----------------------------------------------------- |
| align?    | [ResponsiveProp<Align\>][align]    | 'left'    | Horizontally align items within the container.        |
| alignY?   | [ResponsiveProp<AlignY\>][align-y] | 'stretch' | Vertically align items within the container.          |
| dividers? | boolean                            |           | Sets whether to place a divider between each element. |

`Row` props also include [`Box`](/package/box) props and are not listed here
(excludes `display`, `alignItems`, `flexDirection`, `justifyContent` and
`flexWrap`).

Extra props are also passed into the underlying [`Box`](/package/box) component.

[align]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-20
[align-y]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-22

## Stack

storybookPath: `page-layout-stack--default`

Used to distribute children vertically, with even spacing between each child.

```jsx live
<Stack gap="large">
  <Placeholder />
  <Placeholder />
  <Placeholder />
</Stack>
```

## Examples

### Gap

The spacing between children can be adjusted using the `gap` prop.

```jsx live
<Columns gap="xxlarge">
  <Stack gap="small">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="medium">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="large">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
  <Stack gap="xlarge">
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Stack>
</Columns>
```

### Horizontal alignment

Items can be aligned horizontally using the `align` prop.

```jsx live
<Stack gap="medium" dividers>
  <Stack gap="small" align="left">
    <Placeholder />
    <Placeholder label="left" width={128} />
    <Placeholder />
  </Stack>
  <Stack gap="small" align="center">
    <Placeholder />
    <Placeholder label="center" width={128} />
    <Placeholder />
  </Stack>
  <Stack gap="small" align="right">
    <Placeholder />
    <Placeholder label="right" width={128} />
    <Placeholder />
  </Stack>
</Stack>
```

### Dividers

Use the `dividers` property to render a [Divider](/package/divider) between each
element in the Stack.

```jsx live
<Stack gap="medium" dividers>
  <Text>First item</Text>
  <Text>Second item</Text>
  <Text>Third item</Text>
</Stack>
```

### Nesting

Nest Stack components to create more complex white space rules.

```jsx live
<Stack gap="xlarge">
  <Heading level="4">Heading</Heading>
  <Stack gap="small">
    <Text>Line 1</Text>
    <Text>Line 2</Text>
    <Text>Line 3</Text>
  </Stack>
  <Stack gap="small">
    <Text>Line 1</Text>
    <Text>Line 2</Text>
    <Text>Line 3</Text>
  </Stack>
</Stack>
```

## Props

| Prop      | Type                            | Default   | Description                                           |
| --------- | ------------------------------- | --------- | ----------------------------------------------------- |
| align?    | [ResponsiveProp<Align\>][align] | 'stretch' | Horizontally align items within the container.        |
| dividers? | boolean                         |           | Sets whether to place a divider between each element. |

`Stack` props also include [`Box`](/package/box) props and are not listed here
(excludes `display`, `className`, `alignItems`, `flexDirection`,
`justifyContent` and `flexWrap`).

Extra props are also passed into the underlying [`Box`](/package/box) component.

[align]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/stack/src/Stack.tsx#spark-web/packages/stack/src/Stack.tsx-21
