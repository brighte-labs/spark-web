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

### Async

```jsx live
const [items, setItems] = React.useState([]);
const [value, setValue] = React.useState(null);

const fetchItems = async input => {
  if (!input) return [];
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [{ label: input, value: input }];
};

return (
  <Field label="Search the interwebs">
    <Combobox
      placeholder="Start typing..."
      items={items}
      onChange={value => setValue(value)}
      onInputChange={input => setItems(fetchItems(input))}
      value={value}
    />
  </Field>
);
```

## Custom label and value

```jsx live
const [value, setValue] = React.useState(null);

return (
  <Field
    label="What's your favourite movie?"
    message={JSON.stringify(value ?? {})}
  >
    <Combobox
      placeholder="Select a movie"
      items={[
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
      ]}
      onChange={value => setValue(value)}
      value={value}
      getOptionLabel={option => option.title}
      getOptionValue={option => `${option.year}`}
    />
  </Field>
);
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

| Prop           | Type                              | Default                        | Description                                                                      |
| -------------- | --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| placeholder    | string                            |                                | The text that appears in the form control when it has no value set.              |
| inputValue     | string                            |                                | The value of the input.                                                          |
| items          | Item[] \| Promise\<Item[]\>       |                                | Array of items for the user to select from.                                      |
| onChange       | (value: Nullable\<Item\>) => void |                                | Called when an item is selected.                                                 |
| onInputChange  | (inputValue: string) => void      |                                | Called whenever the input value changes. Use to filter the items.                |
| value          | Nullable\<Item\>                  |                                | The selected item.                                                               |
| getOptionLabel | (option: Item) => string          | (option: Item) => option.label | Resolves option data to a string to be displayed as the label by components      |
| getOptionValue | (option: Item) => string          | (option: Item) => option.value | Resolves option data to a string to compare options and specify value attributes |
| isLoading      | boolean                           |                                | Is the select in a state of loading (async). Useful when manually loading items  |
