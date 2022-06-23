---
title: Field
isExperimentalPackage: false
---

Using context, the field component connects the label, description, and message
to the input element.

```jsx live
<Field label="Label">
  <TextInput />
</Field>
```

## Example

### Label

Each field must be accompanied by a label. Effective form labeling helps users
understand what information to enter into an input.

Using placeholder text in lieu of a label is sometimes employed as a
space-saving method. However, this is not recommended because it hides context
and presents accessibility issues.

```jsx live
<Field label="Name">
  <TextInput />
</Field>
```

#### Label visibility

The label must always be provided for assistive technology, but you may hide it
from sighted users when the intent can be inferred from context.

```jsx live
<Stack gap="xlarge">
  <Field label="Name" labelVisibility="hidden">
    <TextInput placeholder="hidden" />
  </Field>
  <Columns gap="small">
    <Field label="Name">
      <TextInput placeholder="visible" />
    </Field>
    <Field label="Name" labelVisibility="reserve-space">
      <TextInput placeholder="reserve-space" />
    </Field>
  </Columns>
</Stack>
```

#### Secondary label

Provide additional context, typically used to indicate that the field is
optional.

```jsx live
<Field label="Name" secondaryLabel="(Optional)">
  <TextInput />
</Field>
```

### Adornment

Optionally provide a utility or contextual hint, related to the field.

```jsx live
<Field
  label="Username"
  adornment={
    <Text>
      <TextLink href="#">Forgot username?</TextLink>
    </Text>
  }
>
  <TextInput />
</Field>
```

### Description

Provides pertinent information that assists the user in completing a field.
Description text is always visible and appears underneath the label. Use
sentence-style capitalisation, and in most cases, write the text as full
sentences with punctuation.

```jsx live
<Field
  label="Email"
  description="We take your privacy seriously. We will never give your email to a third party."
>
  <TextInput type="email" />
</Field>
```

### Message and tone

The “message” is used to communicate the status of a field, such as an error
message. This will be announced on focus and can be combined with a “tone” to
illustrate intent.

```jsx live
<Stack gap="xlarge">
  <Field label="Label" tone="critical" message="Critical message">
    <TextInput />
  </Field>
  <Field label="Label" tone="positive" message="Positive message">
    <TextInput />
  </Field>
  <Field label="Label" tone="neutral" message="Neutral message">
    <TextInput />
  </Field>
</Stack>
```

### Disabled

Mark the field as disabled by passing true to the disabled prop.

```jsx live
<Field label="Label" secondaryLabel="Secondary label" disabled>
  <TextInput value="Text in disabled field" />
</Field>
```

## Props

| Prop             | Type                                     | Default   | Description                                                                                                                                      |
| ---------------- | ---------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| id?              | string                                   |           | Sets a unique identifier for the component.                                                                                                      |
| data?            | [DataAttributeMap][data-attribute-map]   |           | Sets data attributes on the component.                                                                                                           |
| adornment?       | React.ReactElement                       |           | Optionally provide a utility or contextual hint, related to the field.                                                                           |
| children         | React.ReactNode                          |           | Children elements to be rendered within the component. Expected to be Input elements.                                                            |
| disabled?        | boolean                                  |           | Indicates that the field is perceivable but disabled, so it is not editable or otherwise operable.                                               |
| description?     | string                                   |           | Sets a description for the field to provide additional information that will aid user input.                                                     |
| label            | string                                   |           | Sets a label for the field.                                                                                                                      |
| labelVisibility? | 'hidden' \| 'reserve-space' \| 'visible' | 'visible' | The label must always be provided for assistive technology, but you may hide it from sighted users when the intent can be inferred from context. |
| message?         | string                                   |           | Provide a message, informing the user about changes in state.                                                                                    |
| secondaryLabel?  | string                                   |           | Provides additional context, typically used to indicate that the field is optional.                                                              |
| tone?            | 'critical' \| 'neutral' \| 'positive'    | 'neutral' | Provide a tone to influence elements of the field, and its input.                                                                                |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
