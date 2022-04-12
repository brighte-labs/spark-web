---
title: Text Area
storybookPath: forms-textarea--default
---

Allows the user to input plain text spanning multiple lines.

## Usage

### Field

Each text area input must be accompanied by a Field with a label. Effective form
labeling helps inform users the context and information required of the text area.

## Examples

```jsx live
  const [textInput, setTextInput] = React.useState('');

  return (
    <Stack gap="large">
      <Field label="Add some text">
        <TextArea value={textInput} onChange={event => setTextInput(event.target.value)}/>
      </Field>
      <Text>You have inputed: </Text>
      {textInput && (
        <Text>{textInput}</Text>
      )}
    </Stack>
  )
```

## Props

| Prop          | Type                                         | Default | Description                                                                            |
| ------------- | -------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| data?         | [DataAttributeMap][data-attribute-map]       |         | Sets data attributes on the component.                                                 |
| placeholder?  | string                                       |         | Placeholder text for when the input does not have an initial value.                    |
| defaultValue? | string \| number \| readonly string[]        |         | Default value of the text area.                                                           |
| name?         | string                                       |         | This attribute is used to specify the name of the control.                             |
| onBlur?       | React.FocusEventHandler<HTMLTextAreaElement\>  |         | Function for handling change events.                                                   |
| onChange?     | React.ChangeEventHandler<HTMLTextAreaElement\> |         | Function for handling blur events.                                                     |
| required?     | boolean                                      |         | Boolean that indicates a value is required in the text area. |
| value         | string \| number \| readonly string[]        |         | Value of the text area.                                                                   |
|size?|'xsmall' \| 'small' \| 'standard' \| 'large' | 'standard' | Sets the size of the text inside the text area. |
|weight?|'regular' \| 'medium' \| 'strong' | 'regular' | Sets the weight of the text inside the text area. |

[data-attribute-map]:
  https://bitbucket.org/brighte-energy/energy/src/14a694872cc43bb454981bada65f5f12b56f77c9/spark-web/packages/utils-spark/src/buildDataAttributes.ts#spark-web/packages/utils-spark/src/buildDataAttributes.ts-1
