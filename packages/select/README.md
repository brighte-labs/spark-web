---
title: Select
storybookPath: forms-select--default
---

Allows the user to make a single selection from a list of values — usually in a
form. If only a few options are provided, consider using a `RadioButton`
instead.

## Usage

### Field

Each select input must be accompanied by a Field with a label. Effective form
labeling helps inform users which selection to make.

## Examples

### Controlled

A `<Select>` can be both controlled and uncontrolled. To control a `<Select>`
provide a `value`, as well as an `onChange` function to set the new value when
the select is updated.

```jsx live
const [selectedOption, setSelectedOption] = React.useState('');

const options = [
  { label: 'NSW', value: 'nsw' },
  { label: 'VIC', value: 'vic' },
  { label: 'QLD', value: 'qld' },
  { label: 'SA', value: 'sa' },
  { label: 'WA', value: 'wa' },
  { label: 'TAS', value: 'tas' },
  { label: 'NT', value: 'nt' },
  { label: 'ACT', value: 'act' },
];

return (
  <Stack gap="large">
    <Field label="State">
      <Select
        placeholder="Choose a state..."
        value={selectedOption}
        onChange={event => setSelectedOption(event.target.value)}
        options={options}
        required
      />
    </Field>
    {selectedOption && (
      <Text>
        You have selected{' '}
        {options.find(option => option.value === selectedOption).label}
      </Text>
    )}
  </Stack>
);
```

### Uncontrolled

The `<Select>`, by default, is an uncontrolled component, meaning that the form
data is controlled directly by the DOM itself. To access the value, instead of
writing an `onChange` handler, you would use a `ref` to get form values from the
DOM.

```jsx live
<Field label="Breaking Bad Characters">
  <Select
    options={[
      { label: 'Walter White', value: 'walter-white' },
      { label: 'Jesse Pinkman', value: 'jesse-pinkman' },
      { label: 'Saul Goodman', value: 'saul-goodman' },
      { label: 'Gus Fring', value: 'gus-fring' },
      { label: 'Hank Schrader', value: 'hank-schrader' },
      { label: 'Mike Ehrmantraut', value: 'mike-ehrmantraut' },
    ]}
  />
</Field>
```

### Groups

Related options can be grouped by passing in an array of objects with a label
and option key — where each option is an array of objects with label, value and
(optionally) disabled keys. Internally this uses the
[`<optgroup>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup).

```jsx live
const [selectedOption, setSelectedOption] = React.useState('');

return (
  <Field label="Select">
    <Select
      placeholder="TV Characters"
      options={[
        {
          label: 'Mad Men',
          options: [
            { label: 'Don Draper', value: 'don-draper' },
            { label: 'Peggy Olson', value: 'peggy-olson' },
            { label: 'Joan Harris', value: 'joan-harris' },
            { label: 'Roger Sterling', value: 'roger-sterling' },
            { label: 'Pete Campbell', value: 'pete-campbell' },
          ],
        },
        {
          label: 'Breaking Bad',
          options: [
            { label: 'Walter White', value: 'walter-white' },
            { label: 'Jesse Pinkman', value: 'jesse-pinkman' },
            { label: 'Saul Goodman', value: 'saul-goodman' },
            { label: 'Gus Fring', value: 'gus-fring' },
            { label: 'Hank Schrader', value: 'hank-schrader' },
            { label: 'Mike Ehrmantraut', value: 'mike-ehrmantraut' },
          ],
        },
      ]}
    />
  </Field>
);
```

## Props

| Prop          | Type                                         | Default | Description                                                                            |
| ------------- | -------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| data?         | [DataAttributeMap][data-attribute-map]       |         | Sets data attributes on the component.                                                 |
| options       | Readonly\<Array\<Option \| Group>>           |         | The values that can be selected by the input.                                          |
| placeholder?  | string                                       |         | Placeholder text for when the input does not have an initial value.                    |
| defaultValue? | string \| number \| readonly string[]        |         | Default value of the select.                                                           |
| name?         | string                                       |         | This attribute is used to specify the name of the control.                             |
| onBlur?       | React.FocusEventHandler\<HTMLSelectElement>  |         | Function for handling change events.                                                   |
| onChange?     | React.ChangeEventHandler\<HTMLSelectElement> |         | Function for handling blur events.                                                     |
| required?     | boolean                                      |         | Boolean that indicating that an option with a non-empty string value must be selected. |
| value         | string \| number \| readonly string[]        |         | Value of the select.                                                                   |

[data-attribute-map]:
  https://bitbucket.org/brighte-energy/energy/src/14a694872cc43bb454981bada65f5f12b56f77c9/spark-web/packages/utils-spark/src/buildDataAttributes.ts#spark-web/packages/utils-spark/src/buildDataAttributes.ts-1
