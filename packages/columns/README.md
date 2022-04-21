---
title: Columns
storybookPath: page-layout-columns--default
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

## Props

| Prop           | Type                                                    | Default | Description                                                                            |
| -------------- | ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| alignY?        | [ResponsiveProp][responsive-prop]\<AlignY>              |         | Vertically align items within the container.                                           |
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
