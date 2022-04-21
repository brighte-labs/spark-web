---
title: Text Area
storybookPath: forms-textarea--default
---

Allows the user to input plain text spanning multiple lines.

## Usage

### Field

Each text area input must be accompanied by a Field with a label. Effective form
labeling helps inform users the context and information required of the text
area.

## Examples

### Controlled

```jsx live
const [textInput, setTextInput] = React.useState('');

return (
  <Stack gap="large">
    <Field label="Add some text">
      <TextArea
        value={textInput}
        onChange={event => setTextInput(event.target.value)}
      />
    </Field>
    {textInput && (
      <Text>
        You have inputted: “<Strong>{textInput}</Strong>”
      </Text>
    )}
  </Stack>
);
```

### Uncontrolled

```jsx live
const textAreaRef = React.useRef(null);
const [, setKey] = React.useState(0);

return (
  <Stack gap="large">
    <Field label="Add some text">
      <TextArea ref={textAreaRef} placeholder="Add some text" />
    </Field>
    <Button onClick={() => setKey(currentKey => currentKey + 1)}>Submit</Button>
    {textAreaRef.current?.value && (
      <Text>
        You have inputted: “<Strong>{textAreaRef.current.value}</Strong>”
      </Text>
    )}
  </Stack>
);
```

### Disabled

```jsx live
<Stack gap="large">
  <Field label="Disabled" disabled>
    <TextArea placeholder="This textarea is disabled" />
  </Field>
</Stack>
```

### Message and tone

The `message` is used to communicate the status of a field, such as an error
message. This will be announced on focus and can be combined with a `tone` to
illustrate intent. The supported tones are: `critical`, `positive` and
`neutral`.

```jsx live
<Stack gap="large">
  <Field label="Critical" message="Critical message" tone="critical">
    <TextArea placeholder="Critical" />
  </Field>
  <Field label="Positive" message="Positive message" tone="positive">
    <TextArea placeholder="Positive" />
  </Field>
  <Field label="Neutral" message="Neutral message" tone="neutral">
    <TextArea placeholder="Neutral" />
  </Field>
</Stack>
```

## Props

| Prop          | Type                                           | Default | Description                                                         |
| ------------- | ---------------------------------------------- | ------- | ------------------------------------------------------------------- |
| data?         | [DataAttributeMap][data-attribute-map]         |         | Sets data attributes on the component.                              |
| placeholder?  | string                                         |         | Placeholder text for when the input does not have an initial value. |
| defaultValue? | string \| number \| readonly string[]          |         | Default value of the text area.                                     |
| name?         | string                                         |         | This attribute is used to specify the name of the control.          |
| onBlur?       | React.FocusEventHandler\<HTMLTextAreaElement>  |         | Function for handling change events.                                |
| onChange?     | React.ChangeEventHandler\<HTMLTextAreaElement> |         | Function for handling blur events.                                  |
| required?     | boolean                                        |         | Boolean that indicates a value is required in the text area.        |
| value?        | string \| number \| readonly string[]          |         | Value of the text area.                                             |

[data-attribute-map]:
  https://bitbucket.org/brighte-energy/energy/src/14a694872cc43bb454981bada65f5f12b56f77c9/spark-web/packages/utils-spark/src/buildDataAttributes.ts#spark-web/packages/utils-spark/src/buildDataAttributes.ts-1
