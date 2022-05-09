---
title: Accordion
storybookPath: data-display-accordion--single
---

Accordions are a set of vertically stacked headings which can be toggled to
reveal some associated section of content.

## Example

```jsx live
<Accordion type="single" collapsible>
  <AccordionItem value="item-1" label="What is this?" level="4">
    <Text>This is an example accordion</Text>
  </AccordionItem>
  <AccordionItem value="item-2" label="Should I click this?" level="4">
    <Text>Yes</Text>
  </AccordionItem>
  <AccordionItem value="item-3" label="What is in it for me?" level="4">
    <Text>A nice accordion</Text>
  </AccordionItem>
</Accordion>
```

## Props

### Accordion

The root of the accordion block containing all parts of the accordion.

| Prop           | Type                                   | Default | Description                                                                                                                                  |
| -------------- | -------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | 'single' \| 'multiple'                 |         | Determines whether one or multiple accordion items can be opened at the same time.                                                           |
| value?         | string                                 |         | The controlled value of the item to expand when type is "single". Must be used in conjunction with onValueChange.                            |
| defaultValue?  | string                                 |         | The value of the item to expand when initially rendered and type is "single". Use when you do not need to control the state of the items.    |
| onValueChange? | (v: string) => void                    |         | Event handler called when the expanded state of an item changes and type is "single".                                                        |
| value?         | string[]                               | []      | The controlled value of the item to expand when type is "multiple". Must be used in conjunction with onValueChange.                          |
| defaultValue?  | string[]                               | []      | The value of the item to expand when initially rendered when type is "multiple". Use when you do not need to control the state of the items. |
| onValueChange? | (v: string[]) => void                  |         | Event handler called when the expanded state of an item changes and type is "multiple".                                                      |
| collapsible?   | boolean                                | false   | When type is "single", allows closing content when clicking trigger for an open item.                                                        |
| disabled?      | boolean                                | false   | When true, prevents the user from interacting with the accordion and all its items.                                                          |
| data?          | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component.                                                                                                       |

Additional `div` props are passed to the primitive
[radix accordion root](https://www.radix-ui.com/docs/primitives/components/accordion#root)
component and are not listed.

### AccordionItem

An accordion item section containing heading and collapsible content.

| Prop            | Type                     | Default | Description                                                                       |
| --------------- | ------------------------ | ------- | --------------------------------------------------------------------------------- |
| children        | React.ReactNode          |         | Children element to be rendered in the collapsible content of the accordion item. |
| value           | string                   |         | A unique value for the accordion item.                                            |
| headingElement? | 'h2' \| 'h3' \| 'h4'     | 'h3'    | The html element to render the accordion item heading as.                         |
| level?          | '1' \| '2' \| '3' \| '4' | '3'     | The size of the heading. '1' is largest and '4' is smallest.                      |
| label           | string                   |         | The heading of the accordion item.                                                |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
