---
title: Loader
storybookPath: feedback-overlays-alert—default
---

Loader indicates users that their request is in progress

## Examples

### Tones

The appearance of loader can be cutomised with the tone prop.

Defaults to `primary`.

```jsx live
<Inline gap="xxlarge">
  <Row gap="xxlarge">
    <Loader />
    <Loader tone="neutral" />
    <Loader tone="critical" />
    <Loader tone="disabled" />
  </Row>
</Inline>
```

## Size

Loaders available in two size: `xxsmall` and `xsmall`.

Defaults to `xsmall`.

```jsx live
<Inline gap="xxlarge">
  <Row gap="xxlarge">
    <Loader size="xxsmall" />
    <Loader size="xsmall" />
    <Loader />
  </Row>
</Inline>
```
