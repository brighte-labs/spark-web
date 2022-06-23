---
title: Columns
storybookPath: page-layout-columns--default
isExperimentalPackage: false
---

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

### Template

If you need more control over how your columns are distributed, you can use the
`template` prop. `template` receives an array of numbers that represent the
relative width of each column.

```jsx live
<Columns gap="small" template={[1, 3, 1]} collapseBelow="tablet">
  <Box border="field" padding="small">
    <Text>nav</Text>
  </Box>
  <Box border="field" padding="small">
    <Text>main</Text>
  </Box>
  <Box border="field" padding="small">
    <Text>aside</Text>
  </Box>
</Columns>
```

## Props

| Prop           | Type                                                    | Default | Description                                                                            |
| -------------- | ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| alignY?        | [ResponsiveProp][responsive-prop]\<AlignY>              |         | Vertically align items within the container.                                           |
| children       | React.ReactNode                                         |         | Children elements to be rendered within the column component representing each column. |
| collapseBelow? | [ResponsiveRangeProps][responsive-range-props]['below'] |         | At which breakpoint, if amy, should the columns collapse.                              |
| gap?           | [Gap][gap]                                              |         | The size of the gap between each column.                                               |
| template?      | number[]                                                |         | Define the relative width of each column. By default each column is the same width.    |
| data?          | [DataAttributeMap][data-attribute-map]                  |         | Sets data attributes on the component.                                                 |

[`Box`](/package/box) props are also included as `Column` props and are not
listed here (excluding `display`, `alignItems`, `gap`, `flexDirection`,
`justifyContent` and `flexWrap`).

Extra props are passed into the underlying [`Box`](/package/box) component.

[responsive-prop]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/themeUtils.ts#L11
[responsive-range-props]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/themeUtils.ts#L130
[gap]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/columns/src/Columns.tsx#L17
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
