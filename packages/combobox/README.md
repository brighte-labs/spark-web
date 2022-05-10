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
  <Field label="What's your Adventure Time character?">
    <Combobox
      placeholder="Select a character"
      items={[
        { label: 'Jake', value: 'jake' },
        { label: 'Finn', value: 'finn' },
        { label: 'BMO', value: 'bmo' },
      ]}
      onChange={value => setValue(value)}
      value={value}
    />
  </Field>
);
```

### Uncontrolled component

```jsx live
<Field label="What's your favourite Adventure Time character?">
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
    ]}
  />
</Field>
```

## Appearance

### Disabled

```jsx live
<Field label="What's your favourite Adventure Time character?" disabled>
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
    ]}
  />
</Field>
```

### Invalid

```jsx live
<Field
  label="What's your favourite Adventure Time character?"
  tone="critical"
  message="Required"
>
  <Combobox
    placeholder="Select a character"
    items={[
      { label: 'Jake', value: 'jake' },
      { label: 'Finn', value: 'finn' },
      { label: 'BMO', value: 'bmo' },
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
