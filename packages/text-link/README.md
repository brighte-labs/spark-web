---
title: Text Link
storybookPath: navigation-textlink--default
---

**NOTE:** These components must be nested within a [Text](/package/text) or
[Heading](/package/heading) component.

## TextLink

Text links take users to another place in the application, and usually appear
within or directly following a sentence. Styled to resemble a hyperlink.

```jsx live
<Text>
  This is some text containing a <TextLink href="#">text link</TextLink>
</Text>
```

### Examples

#### Size

The font-size is inherited from the parent [Text](/package/text) component.

```jsx live
<Text size="small">
  A <TextLink href="#">text link</TextLink> inheriting the parent's “small”
  font-size
</Text>
```

#### Custom link

This component renders a native anchor element by default, which can be
customised via the `linkComponent` prop on the [SparkProvider](#todo) component.

#### Subtle

The colour is inherited from the parent [Text](/package/text) component.

```jsx live
<Text size="small">
  A <TextLink href="#">subtle text link</TextLink> that doesn't stand out from
  the text around it
</Text>
```

### Props

| Prop  | Type                                   | Default | Description                             |
| ----- | -------------------------------------- | ------- | --------------------------------------- |
| data? | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component.  |
| href  | string                                 |         | URL to set as destination for the link. |

The `TextLink` component also extends native HTML `a` anchor props and are not
listed here.

## TextLinkButton

Even though it looks like a text link, this is actually a semantic button.

```jsx live
<Text>
  <TextLinkButton>Visually a link, with button semantics</TextLinkButton>
</Text>
```

### Props

| Prop  | Type                                   | Default | Description                            |
| ----- | -------------------------------------- | ------- | -------------------------------------- |
| data? | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component. |

The `TextLinkButton` component also extends native HTML `span` props and are not
listed here.

[data-attribute-map]:
  https://bitbucket.org/brighte-energy/energy/src/14a694872cc43bb454981bada65f5f12b56f77c9/spark-web/packages/utils-spark/src/buildDataAttributes.ts#spark-web/packages/utils-spark/src/buildDataAttributes.ts-1
