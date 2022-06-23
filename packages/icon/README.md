---
title: Icon
isExperimentalPackage: false
---

Spark uses the “outline” variants of the wonderful open-source
[Heroicons](https://heroicons.com/) library.

## Examples

### Size

Define the icon size.

```jsx live
<Inline gap="large" alignY="center">
  <LightBulbIcon size="xsmall" />
  <LightBulbIcon size="small" />
  <LightBulbIcon size="medium" />
  <LightBulbIcon size="large" />
</Inline>
```

### Tone

Define the icon tone.

```jsx live
<Row gap="large" dividers>
  <Inline gap="large">
    <LightBulbIcon tone="neutral" />
    <LightBulbIcon tone="muted" />
  </Inline>
  <Inline gap="large">
    <LightBulbIcon tone="info" />
    <LightBulbIcon tone="positive" />
    <LightBulbIcon tone="caution" />
    <LightBulbIcon tone="critical" />
    <LightBulbIcon tone="accent" />
  </Inline>
</Row>
```

### Contrast

To ensure icons have sufficient contrast, when on a dark background the
foreground tones “neutral” and “muted” will be inverted.

```jsx live
<Inline gap="large">
  <Box background="neutral" padding="small" borderRadius="small">
    <LightBulbIcon tone="neutral" />
  </Box>
  <Box background="neutral" padding="small" borderRadius="small">
    <LightBulbIcon tone="muted" />
  </Box>
</Inline>
```

## Props

| Prop  | Type                              | Default   | Description                |
| ----- | --------------------------------- | --------- | -------------------------- |
| size? | [SizeType][size-type]             | 'small'   | Sets the size of the icon. |
| tone? | [ForegroundTone][foreground-tone] | 'neutral' | Sets the tone of the icon. |

[size-type]:
  https://github.com/brighte-labs/spark-web/blob/11e73659ff4a01a48a8761821bff34c6ec28568b/packages/icon/src/createIcon.tsx#L9
[foreground-tone]:
  https://github.com/brighte-labs/spark-web/blob/6c1909208460cb421e62f516106e774e4b0ddc35/packages/text/src/useForegroundTone.ts#L5
