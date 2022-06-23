---
title: Float Input
storybookPath: forms-float-input--default
isExperimentalPackage: true
---

Float input provides a way for inputting float values.

## Usage

### Field

The component must be nested within a [`Field`](/package/field). See
[`Field`](/package/field) for more details.

## Examples

### Controlled

A `FloatInput` can be either controlled or uncontrolled. To control a
`FloatInput` provide a `value`, as well as an `onChange` function to set the new
value when the select is updated.

```jsx live
const [value, setValue] = React.useState(1000000.101);

return (
  <Stack gap="large">
    <Field label="Example controlled">
      <FloatInput value={value} onChange={v => setValue(v)} />
    </Field>
    <Text>The current value is: {value}</Text>
  </Stack>
);
```

#### Validation

The provided controlled value can be of type string or number. Valid numbers are
represented as numbers and everything else as a string. This allows for easy
passing of floats to other system, whilst also giving a way to check for invalid
string values and provide an appropriate validation error.

```jsx live
const [value, setValue] = React.useState('Hi there');

const isInvalid = typeof value === 'string';

return (
  <Stack gap="large">
    <Field
      label="Example controlled validation"
      tone={isInvalid && 'critical'}
      message={isInvalid && 'Please provide a valid float input'}
    >
      <FloatInput value={value} onChange={v => setValue(v)} />
    </Field>
    <Text>The current value is: {value}</Text>
    <Text>The value type is: {typeof value}</Text>
  </Stack>
);
```

### Uncontrolled

A `FloatInput` can also be uncontrolled, managing it's own internal state. To
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

### Format fraction digits

You can also set to what fraction digit you want the displayed value in the
`FloatInput` to be.

```jsx live
const [value, setValue] = React.useState(10000.101);

return (
  <Stack gap="large">
    <Field label="Example format fraction digits">
      <FloatInput
        fractionDigits={2}
        value={value}
        onChange={v => setValue(v)}
      />
    </Field>
    <Text>The current value is: {value}</Text>
  </Stack>
);
```

### Input Adornments

Similar to [TextInput](/package/text-input/), you can also add adornments to the
`FloatInput` component (at the start or end).

```jsx live
const [value, setValue] = React.useState(10000.101);

return (
  <Stack gap="large">
    <Field label="Example format fraction digits">
      <FloatInput fractionDigits={2} value={value} onChange={v => setValue(v)}>
        <InputAdornment placement="end">
          <Text>kW</Text>
        </InputAdornment>
      </FloatInput>
    </Field>
    <Text>The current value is: {value}</Text>
  </Stack>
);
```

## Props

| Prop            | Type                                    | Default | Description                                                                                                                                                 |
| --------------- | --------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fractionDigits? | number                                  |         | Specifies to what fraction digit to be displayed in the component.                                                                                          |
| value?          | string \| number                        |         | Value to be set in the component if using in a controlled flow. The `onChange` handler must also be set for this prop to be valid.                          |
| onChange?       | (value: number \| string) => void       |         | The handler that is fired for value changes inside the component as part of a controlled flow. The `value` prop must also be set for this prop to be valid. |
| onFocus?        | FocusEventHandler\<HTMLInputElement\>   |         | Handler when input element is focused on.                                                                                                                   |
| onBlur?         | FocusEventHandler\<HTMLInputElement\>   |         | Handler when input element is blurred.                                                                                                                      |
| children?       | [AdornmentChildren][adornment-children] |         | Allows setting of adornments at the start and/or end of the input component.                                                                                |

Additional props also include [`TextInput`](/package/text-input) props which are
not listed here.

[adornment-children]:
  https://github.com/brighte-labs/spark-web/blob/d4da46200f2d6e5e9291d3c650eaaff7e53f411b/packages/text-input/src/childrenToAdornments.tsx#L12
