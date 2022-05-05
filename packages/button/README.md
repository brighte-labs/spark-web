---
title: Button
storybookPath: forms-buttons-button--default
---

Buttons are clickable elements that are used to trigger actions. They
communicate calls to action to the user and allow users to interact with pages
in a variety of ways. Button labels express what action will occur when the user
interacts with it.

## Tone

Button tones can be broken up into two types; decorative and semantic.

For destructive actions like “delete” you should use the semantic `tone` of
`critical`.

For buttons that have no semantic action type (more common on marketing pages)
use one of our decorative `tones`.

Defaults to `primary`.

```jsx live
<Stack gap="large">
  <Text weight="strong">Decorative tones</Text>
  <Inline gap="small">
    <Button tone="primary">Primary</Button>
    <Button tone="secondary">Secondary</Button>
  </Inline>
  <Divider />
  <Text weight="strong">Semantic tones</Text>
  <Inline gap="small">
    <Button tone="neutral">Neutral</Button>
    <Button tone="positive">Positive</Button>
    <Button tone="critical">Critical</Button>
  </Inline>
</Stack>
```

## Prominence

The appearance of the button can be customised with the prominence prop. Valid
options are: `low` and `high`.

Defaults to `high`.

```jsx live
const baseButtonTones = [
  { label: 'Primary', tone: 'primary' },
  { label: 'Secondary', tone: 'secondary' },
  { label: 'Neutral', tone: 'neutral' },
  { label: 'Positive', tone: 'positive' },
  { label: 'Critical', tone: 'critical' },
];

const extraButtonTones = [
  { label: 'Caution', tone: 'caution' },
  { label: 'Informative', tone: 'info' },
];

return (
  <Stack gap="large" dividers>
    <Stack gap="large">
      <Text weight="strong">High prominence</Text>
      <Inline gap="small">
        {baseButtonTones.map(({ label, tone }) => (
          <Button key={label} tone={tone} prominence="high">
            <LightBulbIcon />
            {label}
          </Button>
        ))}
      </Inline>
    </Stack>
    <Stack gap="large">
      <Text weight="strong">Low prominence</Text>
      <Inline gap="small">
        {baseButtonTones.concat(extraButtonTones).map(({ label, tone }) => (
          <Button key={label} tone={tone} prominence="low">
            <LightBulbIcon />
            {label}
          </Button>
        ))}
      </Inline>
    </Stack>
    <Stack gap="large">
      <Text weight="strong">None prominence</Text>
      <Inline gap="small">
        {baseButtonTones.concat(extraButtonTones).map(({ label, tone }) => (
          <Button key={label} tone={tone} prominence="none">
            <LightBulbIcon />
            {label}
          </Button>
        ))}
      </Inline>
    </Stack>
  </Stack>
);
```

## Size

Button's are available in two size: `medium` and `large`.

Defaults to `medium`.

```jsx live
<Inline gap="small">
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</Inline>
```

## Icons

Icons can be placed next to labels to both clarify an action and call attention
to a button.

```jsx live
<Inline gap="small">
  <Button>
    <DownloadIcon />
    Download
  </Button>
  <Button tone="critical">
    <TrashIcon />
    Delete
  </Button>
</Inline>
```

### Icon only

When using buttons that contain only an icon, you must provide a `label` for
users of assistive technology.

```jsx live
<Inline gap="small">
  <Button label="Download PDF">
    <DownloadIcon />
  </Button>
  <Button tone="critical" label="Delete item">
    <TrashIcon />
  </Button>
  <Button tone="neutral" label="Dismiss">
    <XIcon size="xxsmall" />
  </Button>
</Inline>
```

## Loading

Buttons have an optional `loading` prop to indicate that an action is in
progress. When this is true a spinner will be displayed.

Note: buttons will not be interative when `loading` is true.

```jsx live
const [loading, setLoading] = React.useState(false);
const toggle = event => setLoading(event.target.checked);

return (
  <Stack gap="large">
    <Checkbox size="medium" checked={loading} onChange={toggle}>
      <Text>Toggle loading state</Text>
    </Checkbox>
    <Inline gap="large">
      <Button label="Download" loading={loading}>
        <DownloadIcon />
      </Button>
      <Button loading={loading}>
        <DownloadIcon />
        Download
      </Button>
    </Inline>
    <Inline gap="large">
      <Button label="Download" size="large" loading={loading}>
        <DownloadIcon />
      </Button>
      <Button size="large" loading={loading}>
        <DownloadIcon />
        Download
      </Button>
    </Inline>
  </Stack>
);
```

## ButtonLink

The appearance of a button, with the semantics of a link — shares `Button` API,
with the exception of `href` vs `onClick` props.

```jsx live
<Text>
  <ButtonLink href="#">Visually a link, with button semantics</ButtonLink>
</Text>
```

## Props

| Prop              | Type                                                                                     | Default   | Description                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| aria-controls?    | string                                                                                   |           | Identifies the element (or elements) whose contents or presence are controlled by the current element. Only applicable for `Button`.      |
| aria-describedby? | string                                                                                   |           | Identifies the element (or elements) that describes the object. Only applicable for `Button`.                                             |
| aria-expanded?    | string                                                                                   |           | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. Only applicable for `Button`. |
| children          | string \| React.ReactElement\<IconProps>                                                 |           | Children element to be rendered inside the button.                                                                                        |
| data?             | Object                                                                                   |           | Allows setting of data attributes on the button.                                                                                          |
| disabled?         | boolean                                                                                  |           | When true, prevents `onClick` from firing. Only applicable for `Button`.                                                                  |
| href              | string                                                                                   |           | Specifies the url the button should redirect to upon being clicked. Only applicable for `ButtonLink`.                                     |
| id?               | string                                                                                   |           | Unique identifier for the button.                                                                                                         |
| label?            | string                                                                                   |           | Implicit label for buttons only required for icon-only buttons for accessibility reasons.                                                 |
| loading?          | boolean                                                                                  |           | When true, the button will display a loading spinner.                                                                                     |
| onClick?          | Function                                                                                 |           | Function to be fired following a click event of the button. Only applicable for `Button`.                                                 |
| prominence?       | 'high' \| 'low'                                                                          | 'high'    | Sets the visual prominence of the button.                                                                                                 |
| size?             | 'medium' \| 'large'                                                                      | 'medium'  | Sets the size of the button.                                                                                                              |
| tone?             | 'primary' \| 'secondary' \| 'neutral' \| 'positive' \| 'caution' \| 'critical' \| 'info' | 'primary' | Sets the tone of the button.                                                                                                              |
| type?             | 'button' \| 'submit' \| 'reset'                                                          | 'button'  | Sets the button type. Only applicable for `Button`.                                                                                       |
