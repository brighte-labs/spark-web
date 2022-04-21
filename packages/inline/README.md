---
title: Inline
storybookPath: page-layout-inline--default
---

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
| align?  | [ResponsiveProp\<Align>][align]    | 'left'  | Horizontally align items within the container. |
| alignY? | [ResponsiveProp\<AlignY>][align-y] | 'top'   | Vertically align items within the container.   |

[`Box`](/package/box) props are also included as `Inline` props and are not
listed here (excluding `display`, `alignItems`, `flexDirection`,
`justifyContent` and `flexWrap`).

[align]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-20
[align-y]:
  https://bitbucket.org/brighte-energy/energy/src/537c678a81090af545969504776c6b3d2e67743e/spark-web/packages/inline/src/Inline.tsx#spark-web/packages/inline/src/Inline.tsx-22
