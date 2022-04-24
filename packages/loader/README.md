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
let [count, setCount] = React.useState(1);
let [key, setKey] = React.useState(0);

return (
  <Stack align="left" gap="large">
    <Inline gap="large">
      <Button tone="positive" onClick={() => setCount(c => c + 1)}>
        Add
      </Button>
      <Button
        tone="critical"
        onClick={() => setCount(c => (c > 0 ? c - 1 : 0))}
      >
        Remove
      </Button>
      <Button tone="neutral" onClick={() => setKey(key => key + 1)}>
        Rerender
      </Button>
    </Inline>
    {[...Array(count).keys()].map((_, index) => (
      <Button key={`${index}-${key}`}>
        <Loader />
      </Button>
    ))}
  </Stack>
);
```

## Size

Loaders available in two size: `medium` and `large`.

Defaults to `large`.

```jsx live
<Inline gap="xxlarge">
  <Row gap="xxlarge">
    <Loader size="medium" />
    <Loader size="large" />
  </Row>
</Inline>
```