---
title: Radio
storybookPath: forms-radio--default
---

Radios are used select a single value from several options — ususally in a form.
If multiple choices are valid, consider using a `Checkbox` instead.

## Examples

In order to toggle between options, all Radio components should have a matching
`name` prop (unless you are using them inside of a `RadioGroup`).

```jsx live
<Fieldset legend="Favourite Shrek character" gap="large">
  <Radio name="character" value="Shrek">
    Shrek
  </Radio>
  <Radio name="character" value="Fiona">
    Fiona
  </Radio>
  <Radio name="character" value="Donkey">
    Donkey
  </Radio>
</Fieldset>
```

### Size

Radio buttons are available in two sizes: `small` and `medium`.

```jsx live
<Stack gap="large">
  <Fieldset legend="Radio variations (small)" gap="large">
    <Radio size="small" checked={false}>
      Unchecked
    </Radio>
    <Radio size="small" checked>
      Checked
    </Radio>
    <Radio size="small" disabled>
      Disabled
    </Radio>
    <Radio size="small" checked disabled>
      Checked + disabled
    </Radio>
  </Fieldset>
  <Divider />
  <Fieldset legend="Radio variations (medium)" gap="large">
    <Radio size="medium" checked={false}>
      Unchecked
    </Radio>
    <Radio size="medium" checked>
      Checked
    </Radio>
    <Radio size="medium" disabled>
      Disabled
    </Radio>
    <Radio size="medium" checked disabled>
      Checked + disabled
    </Radio>
  </Fieldset>
</Stack>
```

## RadioGroup

The `RadioGroup` can be used to control a group of `Radio` components. The
`RadioGroup` handles the `value`, `tone`, `message`, and `disabled` state of
it's children.

### Controlled

To control a group of `Radio` components, wrap them with a `RadioGroup` and
provide it with a `value` and `onChange` function.

All `Radio` children _must_ be provided with a `value`.

```jsx live
const [selected, setSelected] = React.useState('Shrek');

return (
  <Fieldset legend="Favourite Shrek character" gap="medium">
    <RadioGroup value={selected} onChange={setSelected}>
      <Radio value="Shrek">Shrek</Radio>
      <Radio value="Fiona">Fiona</Radio>
      <Radio value="Donkey">Donkey</Radio>
    </RadioGroup>
    {selected && (
      <Text>
        The selected character is <Strong>{selected}</Strong>
      </Text>
    )}
  </Fieldset>
);
```

### Message and tone

The `message` is used to communicate the status of a field, such as an error
message. This will be announced on focus and can be combined with a `tone` to
illustrate intent. The supported tones are: `critical`, `positive` and
`neutral`.

```jsx live
const [selected, setSelected] = React.useState('critical');
const statuses = {
  critical: {
    message: 'Critical message',
    tone: 'critical',
  },
  positive: {
    message: 'Positive message',
    tone: 'positive',
  },
  neutral: {
    message: 'Neutral message',
    tone: 'neutral',
  },
};

return (
  <Fieldset legend="Radio variations" gap="medium">
    <RadioGroup
      message={statuses[selected]?.message}
      tone={statuses[selected]?.tone}
      value={selected}
      onChange={setSelected}
    >
      <Radio value="critical">Critical</Radio>
      <Radio value="positive">Positive</Radio>
      <Radio value="neutral">Neutral</Radio>
    </RadioGroup>
  </Fieldset>
);
```

## Props

### Radio

| Prop      | Type                | Default | Description                            |
| --------- | ------------------- | ------- | -------------------------------------- |
| children  | React.ReactNode     |         | The radio label content.               |
| checked?  | boolean             |         | When true, the radio will be checked.  |
| disabled? | boolean             | false   | When true, the radio will be disabled. |
| size?     | 'small' \| 'medium' | 'small' | The size of the radio.                 |
| value?    | string              |         | The value of the radio.                |

The `Radio` component also extends `InputHTMLAttributes` props and are not
listed here.

### RadioPrimitive

| Prop      | Type                                   | Default | Description                            |
| --------- | -------------------------------------- | ------- | -------------------------------------- |
| checked?  | boolean                                |         | When true, the radio will be checked.  |
| disabled? | boolean                                |         | When true, the radio will be disabled. |
| size?     | 'small' \| 'medium'                    | 'small' | The size of the radio.                 |
| value?    | string                                 |         | The value of the radio.                |
| data?     | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component. |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1

The `CheckboxPrimitive` component also extends `InputHTMLAttributes` props and
are not listed here.

### RadioGroup

| Prop      | Type                                     | Default   | Description                                                               |
| --------- | ---------------------------------------- | --------- | ------------------------------------------------------------------------- |
| onChange  | onChange: (selectedValue: Value) => void |           | Function that is fired whenever a change event is triggered on a `Radio`. |
| value     | string                                   |           | The value of the nested radios.                                           |
| disabled? | boolean                                  |           | When true, disables the group of nested radios.                           |
| size?     | 'small' \| 'medium'                      |           | The size of the nested radios.                                            |
| message?  | string                                   |           | Provide a message, informing the user about changes in state.             |
| tone?     | 'critical' \| 'positive' \| 'neutral'    | 'neutral' | Provide a tone to influence elements of the field, and its input.         |
