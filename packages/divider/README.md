---
title: Divider
storybookPath: page-layout-divider--default
isExperimentalPackage: false
---

Used to separate and group content. In most cases use the
[Stack](/package/stack).

```jsx live
<Divider />
```

## Examples

### Width

Defines the “width” of the divider.

```jsx live
<Stack gap="large">
  <Stack gap="small">
    <Text>standard</Text>
    <Divider width="standard" />
  </Stack>
  <Stack gap="small">
    <Text>large</Text>
    <Divider width="large" />
  </Stack>
</Stack>
```

### Color

Defines the “color” of the divider.

```jsx live
<Stack gap="large">
  <Stack gap="small">
    <Text>standard</Text>
    <Divider color="standard" />
  </Stack>
  <Stack gap="small">
    <Text>neutral</Text>
    <Divider color="neutral" />
  </Stack>
</Stack>
```

## Props

| Prop      | Type                                | Default    | Description                      |
| --------- | ----------------------------------- | ---------- | -------------------------------- |
| color?    | [DividerColor][divider-color]       |            | Sets the color of the divider.   |
| width?    | keyof [BrighteTheme][brighte-theme] | 'standard' | Sets the width of the divider.   |
| vertical? | boolean                             |            | Displays the divider vertically. |

[divider-color]:
  https://github.com/brighte-labs/spark-web/blob/6c1909208460cb421e62f516106e774e4b0ddc35/packages/divider/src/Divider.tsx#L16
[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
