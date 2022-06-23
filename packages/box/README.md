---
title: Box
storybookPath: page-layout-box--default
isExperimentalPackage: false
---

Box is the lowest-level component for binding theme-based styles to an
individual element on the screen. Internally, all Spark components are made up
of Boxes.

All elements rendered via Box are provided with a CSS reset to ensure that
elements only have styling rules that have been explicitly specified.

## Examples

### Box with border

```jsx live
<Box border="standard" borderRadius="full" padding="large">
  <Text>Lorem ipsum dolor sit amet.</Text>
</Box>
```

### Flexbox layouts

```jsx live
<Box display="flex">
  <Box padding="large" margin="large" background="primary">
    <Text>hi</Text>
  </Box>
  <Box padding="large" margin="large" background="primary">
    <Text>there</Text>
  </Box>
  <Box padding="large" margin="large" background="primary">
    <Text>friend</Text>
  </Box>
</Box>
```

## Props

| Prop            | Type                                                                                                           | Default | Description                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children        | React.ReactNode                                                                                                |         | Children element to be rendered inside the component.                                                                                                        |
| id?             | string                                                                                                         |         | An identifier that must be unique in the whole document.                                                                                                     |
| className?      | string                                                                                                         |         | Custom css styles.                                                                                                                                           |
| asElement?      | string                                                                                                         |         | An option to indicate what the underlying element of the box should be.                                                                                      |
| data?           | [DataAttributeMap][data-attribute-map]                                                                         |         | Sets data attributes on the component.                                                                                                                       |
|                 |                                                                                                                |         |                                                                                                                                                              |
| background?     | keyof [BrighteTheme][brighte-theme]['color']['background']                                                     |         | Sets the backgroud of the component.                                                                                                                         |
| cursor?         | 'default' \| 'pointer'                                                                                         |         | Sets the type of mouse cursor, if any, to show when the mouse pointer is over an element.                                                                    |
| minHeight?      | 0                                                                                                              |         | Sets the minimum height of an element. It prevents the used value of the height property from becoming smaller than the value specified.                     |
| minWidth?       | 0                                                                                                              |         | Sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified.                       |
| overflow?       | 'hidden' \| 'scroll' \| 'visible' \| 'auto'                                                                    |         | Sets the desired behavior for an element's overflow — i.e. when an element's content is too big to fit in its block formatting context — in both directions. |
| shadow?         | keyof [BrighteTheme][brighte-theme]['shadow']                                                                  |         | Adds shadow effects around the element's frame.                                                                                                              |
| userSelect?     | 'none'                                                                                                         |         | Controls whether the user can select text.                                                                                                                   |
|                 |                                                                                                                |         |                                                                                                                                                              |
| margin?         | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on all 4 sides of the element at once.                                                                                                  |
| marginTop?      | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on the top side.                                                                                                                        |
| marginBottom?   | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on the bottom side.                                                                                                                     |
| marginLeft?     | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on the left side.                                                                                                                       |
| marginRight?    | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on the right side.                                                                                                                      |
| marginY?        | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the margin area on the top and bottom side.                                                                                                             |
|                 |                                                                                                                |         |                                                                                                                                                              |
| padding?        | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on all 4 sides of the element at once.                                                                                                |
| paddingTop?     | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the top side.                                                                                                                      |
| paddingBottom?  | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the bottom side.                                                                                                                   |
| paddingLeft?    | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the left side.                                                                                                                     |
| paddingRight?   | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the right side.                                                                                                                    |
| paddingY?       | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the top and bottom side.                                                                                                           |
| paddingX?       | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the padding width on the left and right side.                                                                                                           |
|                 |                                                                                                                |         |                                                                                                                                                              |
| border?         | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['border']['color']>                     |         | Sets the colour of the element's border.                                                                                                                     |
| borderRadius?   | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['border']['color']>                     |         | Rounds the corners of the element's outer border edge.                                                                                                       |
| borderWidth?    | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['border']['color']>                     |         | Sets the width of the element's border.                                                                                                                      |
|                 |                                                                                                                |         |                                                                                                                                                              |
| height?         | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the element's height.                                                                                                                                   |
| width?          | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['spacing']>                             |         | Sets the element's width.                                                                                                                                    |
|                 |                                                                                                                |         |                                                                                                                                                              |
| alignItems?     | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch'                                                            |         | Controls alignment of items on the cross axis.                                                                                                               |
| gap?            | 'small' \| 'medium' \| 'xsmall' \| 'large' \| 'xxsmall' \| 'xlarge' \| 'xxlarge'                               |         | Size of the gap between each child element.                                                                                                                  |
| flexDirection?  | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse'                                                         |         | Defines the main axis, or how the children are placed.                                                                                                       |
| justifyContent? | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'space-between'                                         |         | Sets how to distribute space between and around content items along the main axis.                                                                           |
| flexWrap?       | [ResponsiveProp][responsive-prop]\<'nowrap' \| 'wrap'>                                                         |         | Allow flex items to flow onto multiple lines.                                                                                                                |
|                 |                                                                                                                |         |                                                                                                                                                              |
| alignSelf?      | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch'                                                            |         | Override's parent's `align-items` value and controls alignment of item's on the cross axis.                                                                  |
| flex?           | [ResponsiveProp][responsive-prop]\<0 \| 1>                                                                     |         | Sets how a flex item will grow or shrink to fit the space available in its flex container.                                                                   |
| flexGrow?       | [ResponsiveProp][responsive-prop]\<0 \| 1>                                                                     |         | Sets the flex grow factor of a flex item main size.                                                                                                          |
| flexShrink?     | [ResponsiveProp][responsive-prop]\<0 \| 1>                                                                     |         | Sets the flex shrink factor of a flex item.If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink.    |
|                 |                                                                                                                |         |
| position?       | [ResponsiveProp][responsive-prop]\<'absolute' \| 'fixed' \| 'relative' \| 'sticky'>                            |         | Sets how an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.    |
| top?            | [ResponsiveProp][responsive-prop]\<0>                                                                          |         | Specifies vertical position of a positioned element. Has no effect on non-positioned elements.                                                               |
| bottom?         | [ResponsiveProp][responsive-prop]\<0>                                                                          |         | Specifies vertical position of a positioned element. Has no effect on non-positioned elements.                                                               |
| left?           | [ResponsiveProp][responsive-prop]\<0>                                                                          |         | Specifies horizontal position of a positioned element. Has no effect on non-positioned elements.                                                             |
| right?          | [ResponsiveProp][responsive-prop]\<0>                                                                          |         | Specifies horizontal position of a positioned element. Has no effect on non-positioned elements.                                                             |
| zIndex?         | [ResponsiveProp][responsive-prop]\<keyof [BrighteTheme][brighte-theme]['elevation']>                           |         | Sets the z-order of a positioned element and its descendants or flex-items. Overlapping element with a larger z-index cover those with a smaller one.        |
|                 |                                                                                                                |         |
| display?        | [ResponsiveProp][responsive-prop]\<'block' \| 'flex' \| 'inline' \| 'inline-block' \| 'inline-flex' \| 'none'> |         | Sets the display of element.                                                                                                                                 |
| opacity?        | [ResponsiveProp][responsive-prop]\<number>                                                                     |         | Sets the opacity of the element.                                                                                                                             |

By default, Box renders a `div` element. You can customise this via the `as`
prop. Extra props will also be forwarded to the underlying element.

[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
[responsive-prop]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/themeUtils.ts#L11
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
