---
title: Combobox
storybookPath: forms-combobox--default
---

The `Combobox` allows the user to browse, search, and make a single selection
from a large list of values.

## Usage

### Controlled component

```jsx live
const [value, setValue] = React.useState(null);

return (
  <Field label="What's your favourite ice cream flavour?">
    <Combobox
      placeholder="Select a flavour"
      items={[
        { label: 'Chocolate', value: 'chocolate' },
        { label: 'Vanilla', value: 'vanilla' },
        { label: 'Strawberry', value: 'strawberry' },
      ]}
      onChange={value => setValue(value)}
      value={value}
    />
  </Field>
);
```

### Uncontrolled component

```jsx live
<Field label="What's your favourite ice cream flavour?">
  <Combobox
    placeholder="Select a flavour"
    items={[
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
      { label: 'Strawberry', value: 'strawberry' },
    ]}
  />
</Field>
```

## Appearance

### Disabled

```jsx live
<Field label="What's your favourite ice cream flavour?" disabled>
  <Combobox
    placeholder="Select a flavour"
    items={[
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
      { label: 'Strawberry', value: 'strawberry' },
    ]}
  />
</Field>
```

### Invalid

```jsx live
<Field
  label="What's your favourite ice cream flavour?"
  tone="critical"
  message="Required"
>
  <Combobox
    placeholder="Select a flavour"
    items={[
      { label: 'Chocolate', value: 'chocolate' },
      { label: 'Vanilla', value: 'vanilla' },
      { label: 'Strawberry', value: 'strawberry' },
    ]}
  />
</Field>
```

## Props

| Prop          | Type                              | Default | Description                                                         |
| ------------- | --------------------------------- | ------- | ------------------------------------------------------------------- |
| placeholder   | string                            |         | The text that appears in the form control when it has no value set. |
| inputValue    | string                            |         | The value of the input.                                             |
| items         | Item[]                            |         | Array of items for the user to select from.                         |
| onChange      | (value: Nullable\<Item\>) => void |         | Called when an item is selected.                                    |
| onInputChange | (inputValue: string) => void      |         | Called whenever the input value changes. Use to filter the items.   |
| value         | Nullable\<Item\>                  |         | The selected item.                                                  |
