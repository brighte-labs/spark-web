---
title: Checkbox
storybookPath: forms-checkbox--default
isExperimentalPackage: false
---

Checkboxes are used to toggle between checked and unchecked states — usually in
a form. If only one option from a list is allowed to be enable, consider using a
`RadioButton` instead.

## Examples

### Controlled

Checkboxes can be both controlled and uncontrolled. To control a checkbox
provide the `checked` state with a value you control, as well as an `onChange`
function to set the new value when the checkbox is toggled.

```jsx live
const [checked, setChecked] = React.useState(false);

return (
  <Stack gap="large">
    <Checkbox
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
    >
      <Text>{checked ? 'Hide' : 'Show'} message</Text>
    </Checkbox>
    {checked && <Text>Toggle the checkbox to hide this message</Text>}
  </Stack>
);
```

### Size

Checkboxes are available in two sizes: `small` and `medium`.

```jsx live
<Stack gap="large">
  <Fieldset legend="Checkbox variations (small)" gap="large">
    <Checkbox size="small" checked={false}>
      Unchecked
    </Checkbox>
    <Checkbox size="small" checked>
      Checked
    </Checkbox>
    <Checkbox size="small" disabled>
      Disabled
    </Checkbox>
    <Checkbox size="small" checked disabled>
      Checked + disabled
    </Checkbox>
  </Fieldset>
  <Divider />
  <Fieldset legend="Checkbox variations (medium)" gap="large">
    <Checkbox size="medium" checked={false}>
      Unchecked
    </Checkbox>
    <Checkbox size="medium" checked>
      Checked
    </Checkbox>
    <Checkbox size="medium" disabled>
      Disabled
    </Checkbox>
    <Checkbox size="medium" checked disabled>
      Checked + disabled
    </Checkbox>
  </Fieldset>
</Stack>
```

### Message and tone

The `message` is used to communicate the status of a field, such as an error
message. This will be announced on focus and can be combined with a `tone` to
illustrate intent. The supported tones are: `critical`, `positive` and
`neutral`.

```jsx live
<Fieldset legend="Message and tone" gap="large">
  <Checkbox message="Critical message" tone="critical">
    Critical
  </Checkbox>
  <Checkbox message="Positive message" tone="positive">
    Positive
  </Checkbox>
  <Checkbox message="Neutral message" tone="neutral">
    Neutral
  </Checkbox>
</Fieldset>
```

## Props

### Checkbox

| Prop      | Type                                   | Default   | Description                                                       |
| --------- | -------------------------------------- | --------- | ----------------------------------------------------------------- |
| children  | React.ReactNode                        |           | The checkbox label content.                                       |
| checked?  | boolean                                |           | When true, the checkbox will be checked.                          |
| disabled? | boolean                                | false     | When true, the checkbox will be disabled.                         |
| size?     | 'small' \| 'medium'                    | 'small'   | The size of the checkbox.                                         |
| value?    | string                                 |           | The value of the checkbox.                                        |
| message?  | string                                 |           | Provide a message, informing the user about changes in state.     |
| tone?     | 'critical' \| 'positive' \| 'neutral'  | 'neutral' | Provide a tone to influence elements of the field, and its input. |
| data?     | [DataAttributeMap][data-attribute-map] |           | Sets data attributes on the component.                            |

The `Checkbox` component also extends `InputHTMLAttributes` props and are not
listed here.

### CheckboxPrimitive

| Prop      | Type                | Default | Description                               |
| --------- | ------------------- | ------- | ----------------------------------------- |
| checked?  | boolean             |         | When true, the checkbox will be checked.  |
| disabled? | boolean             |         | When true, the checkbox will be disabled. |
| size?     | 'small' \| 'medium' | 'small' | The size of the checkbox.                 |
| value?    | string              |         | The value of the checkbox.                |

The `CheckboxPrimitive` component also extends `InputHTMLAttributes` props and
are not listed here.

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
