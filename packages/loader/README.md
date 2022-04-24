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
      <Inline key={`${index}-${key}`} gap="large">
        <Button label="Medium loader example" size="medium">
          <Loader />
        </Button>
        <Button label="Large loader example" size="large">
          <Loader />
        </Button>
      </Inline>
    ))}
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
