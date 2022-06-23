---
title: Hidden
storybookPath: accessibility-hidden--default
isExperimentalPackage: false
---

Conditionally display content for different screen sizes and media types.

```jsx live
<Stack gap="small">
  <Hidden below="wide">
    <Placeholder label="Hidden below wide" height={64} />
  </Hidden>
  <Hidden above="desktop">
    <Placeholder label="Visible below wide" height={64} />
  </Hidden>
</Stack>
```

## Examples

### Responsive

Hide content responsively using the `above` and `below` props, which accept a
breakpoint name.

```jsx live
<Stack gap="small">
  <Hidden below="wide">
    <Placeholder label="1. Hidden below wide" height={64} />
  </Hidden>
  <Hidden below="desktop">
    <Placeholder label="2. Hidden below desktop" height={64} />
  </Hidden>
  <Hidden below="tablet">
    <Placeholder label="3. Hidden below tablet" height={64} />
  </Hidden>
  <Hidden above="mobile">
    <Placeholder label="4. Hidden above mobile" height={64} />
  </Hidden>
  <Hidden above="tablet">
    <Placeholder label="5. Hidden above tablet" height={64} />
  </Hidden>
  <Hidden above="desktop">
    <Placeholder label="6. Hidden above desktop" height={64} />
  </Hidden>
</Stack>
```

### Print

Conditionally display content for print using the `on` prop.

```jsx live
<Stack gap="small">
  <Hidden on="screen">
    <Placeholder label="Hidden on screen" height={64} />
  </Hidden>
  <Hidden on="print">
    <Placeholder label="Hidden on print" height={64} />
  </Hidden>
</Stack>
```

## Props

| Prop     | Type                                   | Default | Description                                                             |
| -------- | -------------------------------------- | ------- | ----------------------------------------------------------------------- |
| children | React.ReactNode                        |         | Children elements to be conditionally rendered.                         |
| data?    | [DataAttributeMap][data-attribute-map] |         | Sets data attributes for the element.                                   |
| inline?  | boolean                                |         | Sets whether element should be rendered in-line or on a new line.       |
| on?      | 'screen' \| 'print'                    |         | Sets whether element should be hidden.                                  |
| above?   | 'mobile' \| 'tablet' \| 'desktop'      |         | Sets the screen width floor breakpoint the elements should be hidden.   |
| below?   | 'mobile' \| 'tablet' \| 'desktop'      |         | Sets the screen width ceiling breakpoint the elements should be hidden. |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
