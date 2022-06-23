---
title: Password Input
storybookPath: forms-passwordinput--default
isExperimentalPackage: true
---

The password input component allows accepting of password text values. The
component builds off its underlying [TextInput](/package/text-input) component
and toggles the input mode between `password` and `text` depending on whether
the show password icon button is toggled to show or hide the password value.

## Usage

The component must be nested within a [`Field`](/package/field). See
[`Field`](/package/field) for more details.

## Examples

### Field utilities

You can use the parent [Field](/package/field) to set appropriate field level
labels, description adornments and messages.

```jsx live
<Stack gap="large">
  <Field
    label="Password"
    adornment={
      <Text>
        <TextLink href="#">Forgot password?</TextLink>
      </Text>
    }
    description={
      'Make sure your chosen password is at least 10 characters long.'
    }
  >
    <PasswordInput />
  </Field>
</Stack>
```

### Uncontrolled

Similar to [TextInput](/package/text-input), the component can be uncontrolled
and managing its own internal state.

```jsx live
const passwordRef = React.useRef(null);
const [value, setValue] = React.useState('');
const showValueHandler = React.useCallback(() => {
  setValue(passwordRef.current?.value);
}, [setValue]);

return (
  <Stack gap="large">
    <Field label="Example uncontrolled">
      <PasswordInput ref={passwordRef} />
    </Field>
    <Button onClick={showValueHandler}>Display password value</Button>
    <Text>The password value is: {value}</Text>
  </Stack>
);
```

### Controlled

Similar to [TextInput](/package/text-input), the component can be controlled by
passing in a `value` and `onChange` handler and have its state managed in a
parent component.

```jsx live
const [value, setValue] = React.useState(``);

return (
  <Stack gap="large">
    <Field label="Example controlled">
      <PasswordInput value={value} onChange={e => setValue(e.target.value)} />
    </Field>
    <Text>The current password value is: {value}</Text>
  </Stack>
);
```

## Props

The component passes props into its underlying [TextInput](/package/text-input)
component and are not listed here.
