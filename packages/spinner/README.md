---
title: Spinner
storybookPath: feedback-overlays-spinner-—default
---

Spinner indicates users that their request is in progress

## Examples

### Tones

The appearance of Spinner can be cutomised with the tone prop.

Defaults to `primary`.

```jsx live
const tones = ['secondary', 'critical', 'positive', 'neutral'];

return (
  <Stack align="left" gap="xxlarge">
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Button tone={tone} prominence="low" key={`low-btn-${index}`}>
          <Spinner />
        </Button>
      ))}
    </Inline>
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Button tone={tone} key={`btn-${index}`}>
          <Spinner />
        </Button>
      ))}
    </Inline>
    <Inline gap="xxlarge">
      {tones.map((tone, index) => (
        <Spinner tone={tone} key={`spinner-${index}`} />
      ))}
    </Inline>
  </Stack>
);
```

## Size

Spinners available in two size: `xxsmall` and `xsmall`.

Defaults to `xsmall`.

```jsx live
<Inline gap="xxlarge">
  <Row gap="xxlarge">
    <Spinner size="xxsmall" />
    <Spinner size="xsmall" />
  </Row>
</Inline>
```
