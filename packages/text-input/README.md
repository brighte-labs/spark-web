---
title: Text Input
storybookPath: forms-textinput--default
isExperimentalPackage: false
---

Text input provides a way for inputting text. The component must be nested
within a [`Field`](/package/field). See [`Field`](/package/field) for more
details.

## Text Input

### Controlled

A `TextInput` can be either controlled or uncontrolled. To control a `TextInput`
provide a `value`, as well as an `onChange` function to set the new value when
the select is updated.

```jsx live
const [value, setValue] = React.useState(1000000.101);

return (
  <Stack gap="large">
    <Field label="Example controlled">
      <TextInput value={value} onChange={e => setValue(e.target.value)} />
    </Field>
    <Text>The current value is: {value}</Text>
  </Stack>
);
```

### Uncontrolled

A `TextInput` can also be uncontrolled, managing it's own internal state. To
access the value, instead of writing an onChange handler, you would use a ref to
get form values from the DOM.

```jsx live
const inputRef = React.useRef(null);
const [value, setValue] = React.useState('');
const showValueHandler = React.useCallback(() => {
  setValue(inputRef.current?.value);
}, [setValue]);

return (
  <Stack gap="large">
    <Field label="Example uncontrolled">
      <FloatInput ref={inputRef} />
    </Field>
    <Button onClick={showValueHandler}>Show input value</Button>
    <Text>The input value is: {value}</Text>
  </Stack>
);
```

### Input Adornments

You can also add adornments to the `TextInput` component (at the start or end).

```jsx live
const [value, setValue] = React.useState(10000.101);

return (
  <Stack gap="large">
    <Field label="Example">
      <TextInput type="numeric" onChange={e => setValue(e.target.value)}>
        <InputAdornment placement="start">
          <Text>~</Text>
        </InputAdornment>
        <InputAdornment placement="end">
          <Text>%</Text>
        </InputAdornment>
      </TextInput>
    </Field>
    <Text>The current value is: {value}</Text>
  </Stack>
);
```

## InputContainer

The `InputContainer` is used internally to handle some shared styling between
components that are wrapped in the `Field` component.

Typically input adornments (icons or buttons that _appear_ to be inside the
input) will be absolutely positioning above it and padding is applied to make
sure that text does not get obscured below the adornments.

On top of this, password managers will insert buttons above the input which can
get in the way of our adornments.

To get around these problems, we wrap the input and adornments with the
`InputContainer` and apply our own focus styles to an absolutely positioned
element that is an adjacent sibling of the input (when the input is focused).

The `InputContainer` also provides the border and background styles and has
slots to place the start and end adornments.

## Props

### TextInput

| Prop         | Type                                                                                | Default | Description                                                                                  |
| ------------ | ----------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| data?        | [DataAttributeMap][data-attribute-map]                                              |         | Sets data attributes for the component.                                                      |
| type?        | 'text' \| 'password' \| 'email' \| 'search' \| 'number' \| 'tel' \| 'url'           | 'text'  | Sets the type attribute for the component.                                                   |
| mode?        | 'none' \| 'text' \| 'tel' \| 'url' \| 'email' \| 'numeric' \| 'decimal' \| 'search' |         | Sets the input mode attribute for the component.                                             |
| onBlur?      | React.FocusEventHandler\<HTMLInputElement\>                                         |         | Callback function when input field component loses focuses.                                  |
| onFocus?     | React.FocusEventHandler\<HTMLInputElement\>                                         |         | Callback function when the input field component is in focus.                                |
| onChange?    | React.FormEventHandler\<HTMLInputElement\>                                          |         | Callback function when value of the input field has been changed.                            |
| placeholder? | string                                                                              |         | Specifies a short hint that describes the expected value (type of value) of the input field. |
| value?       | string \| number \| readonly string[]                                               |         | Specifies the value of the input field.                                                      |
| children?    | [AdornmentChildren][adornment-children]                                             |         | Allows setting of adornments at the start and/or end of the input component.                 |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
[adornment-children]:
  https://github.com/brighte-labs/spark-web/blob/d4da46200f2d6e5e9291d3c650eaaff7e53f411b/packages/text-input/src/childrenToAdornments.tsx#L12

### InputContainer

| Prop            | Type                                | Default | Description                     |
| --------------- | ----------------------------------- | ------- | ------------------------------- |
| startAdornment? | ReactElement\<InputAdornmentProps\> |         | Slot to start render adornment. |
| endAdornment?   | ReactElement\<InputAdornmentProps\> |         | Slot to end render adornment.   |

Extra props are passed into the underlying [`Box`](/package/box) component.
