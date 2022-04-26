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
const tones = ['secondary', 'critical', 'positive', 'neutral'];

return (
  <Stack align="left" gap="xxlarge">
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Button tone={tone} prominence="low" key={`low-btn-${index}`}>
          <Loader />
        </Button>
      ))}
    </Inline>
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Button tone={tone} key={`btn-${index}`}>
          <Loader />
        </Button>
      ))}
    </Inline>
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Loader tone={tone} key={`loader-${index}`} />
      ))}
    </Inline>
  </Stack>
);
```

## Size

Loaders available in two size: `xxsmall` and `xsmall`.

Defaults to `xsmall`.

```jsx live
<Inline gap="xxlarge">
  <Row gap="xxlarge">
    <Loader size="xxsmall" />
    <Loader size="xsmall" />
  </Row>
</Inline>
```
