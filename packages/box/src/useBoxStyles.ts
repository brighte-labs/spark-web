import type { BrighteTheme, ResponsiveProp } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';

// TODO perf review
// TODO: review responsive props! Now that we're using object syntax, un-mapped properties don't behave as expected

// types

type ValidGapKeys = keyof Omit<BrighteTheme['spacing'], 'none' | 'full'>;
type ResponsiveSpacing = ResponsiveProp<keyof BrighteTheme['spacing']>;
type ResponsiveSizing = ResponsiveProp<keyof BrighteTheme['sizing']>;

export type ResponsiveBoxProps = {
  /**
   * The `margin` shorthand property sets the margin area on all four sides of
   * an element at once.
   */
  margin?: ResponsiveSpacing;
  /**
   * The `marginTop` property sets the margin area on the top side of an
   * element.
   */
  marginTop?: ResponsiveSpacing;
  /**
   * The `marginRight` property sets the margin area on the right side of an
   * element.
   */
  marginRight?: ResponsiveSpacing;
  /**
   * The `marginBottom` property sets the margin area on the bottom side of an
   * element.
   */
  marginBottom?: ResponsiveSpacing;
  /**
   * The `marginLeft` property sets the margin area on the left side of an
   * element.
   */
  marginLeft?: ResponsiveSpacing;
  /**
   * The `marginY` shorthand property sets the margin area on the top and
   * bottom of the element.
   */
  marginY?: ResponsiveSpacing;
  /**
   * The `marginY` shorthand property sets the margin area on the left and
   * right of the element.
   */
  marginX?: ResponsiveSpacing;

  // ==============================
  // PADDING
  // ==============================

  /**
   * The `padding` shorthand property sets the padding area on all four sides
   * of an element at once.
   */
  padding?: ResponsiveSpacing;
  /**
   * The `paddingTop` property sets the height of the padding area on the top
   * of an element.
   */
  paddingTop?: ResponsiveSpacing;
  /**
   * The `paddingRight` property sets the width of the padding area on the
   * right of an element.
   */
  paddingRight?: ResponsiveSpacing;
  /**
   * The `paddingBottom` property sets the height of the padding area on the
   * bottom of an element.
   */
  paddingBottom?: ResponsiveSpacing;
  /**
   * The `paddingLeft` property sets the width of the padding area on the left
   * of an element.
   */
  paddingLeft?: ResponsiveSpacing;
  /**
   * The `paddingY` shorthand property sets the padding area on the top and
   * bottom of the element.
   */
  paddingY?: ResponsiveSpacing;
  /**
   * The `paddingX` shorthand property sets the padding area on the left and
   * right of the element.
   */
  paddingX?: ResponsiveSpacing;

  // ==============================
  // BORDER
  // ==============================

  /** The `border` property sets the color of an element's border. */
  border?: ResponsiveProp<keyof BrighteTheme['border']['color']>;
  /**
   * The `borderRadius` property rounds the corners of an element's outer
   * border edge.
   */
  borderRadius?: ResponsiveProp<keyof BrighteTheme['border']['radius']>;
  /**
   * The `borderWidth` property sets the width of an element's border.
   */
  borderWidth?: ResponsiveProp<keyof BrighteTheme['border']['width']>;

  // ==============================
  // DIMENSIONS
  // ==============================

  /** Sets the element's height. */
  height?: ResponsiveSizing;
  /** Sets the element's width. */
  width?: ResponsiveSizing;

  // ==============================
  // FLEX: Parent
  // ==============================

  /** Controls the alignment of items on the cross axis. */
  alignItems?: ResponsiveProp<keyof typeof flexMap.alignItems>;
  /** The size of the gap between each child element. */
  gap?: ResponsiveProp<ValidGapKeys>;
  /** Defines the main axis, or how the children are placed. */
  flexDirection?: ResponsiveProp<keyof typeof flexMap.flexDirection>;
  /**
   * defines how the browser distributes space between and around content items
   * along the main-axis.
   */
  justifyContent?: ResponsiveProp<keyof typeof flexMap.justifyContent>;
  /** Allow flex items to flow onto multiple lines. */
  flexWrap?: ResponsiveProp<'nowrap' | 'wrap'>;

  // ==============================
  // FLEX: Child
  // ==============================

  /**
   * Overrides the parent's `align-items` value. Controls the alignment of
   * item's on the cross axis.
   */
  alignSelf?: ResponsiveProp<keyof typeof flexMap.alignItems>;
  /**
   * The `flex` shorthand property sets how a flex item will grow or shrink to
   * fit the space available in its flex container.
   */
  flex?: ResponsiveProp<0 | 1>;
  /** The `flexGrow` property sets the flex grow factor of a flex item main size. */
  flexGrow?: ResponsiveProp<0 | 1>;
  /**
   * The `flexShrink` property sets the flex shrink factor of a flex item. If
   * the size of all flex items is larger than the flex container, items shrink
   * to fit according to `flex-shrink`.
   */
  flexShrink?: ResponsiveProp<0 | 1>;

  // ==============================
  // POSITION
  // ==============================

  /**
   * The `position` property sets how an element is positioned in a document.
   * The `top`, `right`, `bottom`, and `left` properties determine the final
   * location of positioned elements.
   */
  position?: ResponsiveProp<'absolute' | 'fixed' | 'relative' | 'sticky'>;
  /**
   * The `top` property participates in specifying the vertical position of a
   * positioned element. It has no effect on non-positioned elements.
   */
  top?: ResponsiveProp<0>;
  /**
   * The `right` property participates in specifying the horizontal position of
   * a positioned element. It has no effect on non-positioned elements.
   */
  right?: ResponsiveProp<0>;
  /**
   * The `bottom` property participates in setting the vertical position of a
   * positioned element. It has no effect on non-positioned elements.
   */
  bottom?: ResponsiveProp<0>;
  /**
   * The `left` property participates in specifying the horizontal position of a
   * positioned element. It has no effect on non-positioned elements.
   */
  left?: ResponsiveProp<0>;
  /**
   * The `zIndex` property sets the "z-order" of a positioned element and its
   * descendants or flex items. Overlapping elements with a larger z-index cover
   * those with a smaller one.
   */
  zIndex?: ResponsiveProp<keyof BrighteTheme['elevation']>;

  // ==============================
  // MISC...
  // ==============================

  /**
   * Sets whether an element is treated as a block or inline element and the
   * layout used for its children.
   */
  display?: ResponsiveProp<
    'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'none'
  >;
  /**
   * Sets the opacity of the element. Opacity is the degree to which content
   * behind an element is hidden, and is the opposite of transparency.
   */
  opacity?: ResponsiveProp<number>;
};

type UnresponsiveBoxProps = {
  /** The `background` property sets the background color of an element. */
  background?: keyof BrighteTheme['color']['background'];
  /**
   * The `cursor` property sets the type of mouse cursor, if any, to show when
   * the mouse pointer is over an element.
   */
  cursor?: 'default' | 'pointer';
  /**
   * The `minHeight` property sets the minimum height of an element. It prevents
   * the used value of the height property from becoming smaller than the value
   * specified for `minHeight`.
   */
  minHeight?: 0;
  /**
   * The `minWidth` property sets the minimum width of an element. It prevents
   * the used value of the width property from becoming smaller than the value
   * specified for `minWidth`.
   */
  minWidth?: 0;
  /**
   * The `overflow` shorthand property sets the desired behavior for an
   * element's overflow — i.e. when an element's content is too big to fit in
   * its block formatting context — in both directions.
   */
  overflow?: 'hidden' | 'scroll' | 'visible' | 'auto';
  /** The `boxShadow` property adds shadow effects around an element's frame. */
  shadow?: keyof BrighteTheme['shadow'];
  /** The `userSelect` property controls whether the user can select text. */
  userSelect?: 'none';
};

export type BoxStyleProps = UnresponsiveBoxProps & ResponsiveBoxProps;

// Hook
// ------------------------------

export const useBoxStyles = ({
  alignItems,
  alignSelf,
  background,
  border,
  borderRadius,
  borderWidth = 'standard',
  bottom,
  cursor,
  display,
  flex,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  gap,
  height,
  justifyContent,
  left,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  minHeight,
  minWidth,
  opacity,
  overflow,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
  position,
  right,
  shadow,
  top,
  userSelect,
  width,
  zIndex,
}: BoxStyleProps) => {
  const theme = useTheme();

  const unresponsiveProps = {
    background: background ? theme.color.background[background] : undefined,
    boxShadow: shadow ? theme.shadow[shadow] : undefined,
    cursor,
    minHeight,
    minWidth,
    opacity,
    overflow,
    userSelect,
  };

  const conditionalBorderStyles = border
    ? {
        borderStyle: 'solid',
        borderColor: theme.utils.mapResponsiveScale(border, theme.border.color),
        borderWidth: theme.utils.mapResponsiveScale(
          borderWidth,
          theme.border.width
        ),
      }
    : null;

  return theme.utils.resolveResponsiveProps({
    ...unresponsiveProps,
    ...conditionalBorderStyles,

    // allow padding and height/width props to play nice
    display: theme.utils.mapResponsiveProp(display),

    // margin
    marginBottom: theme.utils.mapResponsiveScale(
      marginBottom || marginY || margin,
      theme.spacing
    ),
    marginTop: theme.utils.mapResponsiveScale(
      marginTop || marginY || margin,
      theme.spacing
    ),
    marginLeft: theme.utils.mapResponsiveScale(
      marginLeft || marginX || margin,
      theme.spacing
    ),
    marginRight: theme.utils.mapResponsiveScale(
      marginRight || marginX || margin,
      theme.spacing
    ),

    // padding
    paddingBottom: theme.utils.mapResponsiveScale(
      paddingBottom || paddingY || padding,
      theme.spacing
    ),
    paddingTop: theme.utils.mapResponsiveScale(
      paddingTop || paddingY || padding,
      theme.spacing
    ),
    paddingLeft: theme.utils.mapResponsiveScale(
      paddingLeft || paddingX || padding,
      theme.spacing
    ),
    paddingRight: theme.utils.mapResponsiveScale(
      paddingRight || paddingX || padding,
      theme.spacing
    ),

    // border
    borderRadius: theme.utils.mapResponsiveScale(
      borderRadius,
      theme.border.radius
    ),

    // flex: parent
    alignItems: theme.utils.mapResponsiveScale(alignItems, flexMap.alignItems),
    gap: theme.utils.mapResponsiveScale(gap, theme.spacing),
    flexDirection: theme.utils.mapResponsiveScale(
      flexDirection,
      flexMap.flexDirection
    ),
    justifyContent: theme.utils.mapResponsiveScale(
      justifyContent,
      flexMap.justifyContent
    ),
    flexWrap: theme.utils.mapResponsiveProp(flexWrap),

    // flex: child
    alignSelf: theme.utils.mapResponsiveScale(alignSelf, flexMap.alignItems),
    flex: theme.utils.mapResponsiveProp(flex),
    flexGrow: theme.utils.mapResponsiveProp(flexGrow),
    flexShrink: theme.utils.mapResponsiveProp(flexShrink),

    // dimension
    height: theme.utils.mapResponsiveScale(height, theme.sizing),
    width: theme.utils.mapResponsiveScale(width, theme.sizing),

    // position
    position: theme.utils.mapResponsiveProp(position),
    bottom: theme.utils.mapResponsiveProp(bottom),
    left: theme.utils.mapResponsiveProp(left),
    right: theme.utils.mapResponsiveProp(right),
    top: theme.utils.mapResponsiveProp(top),
    zIndex: theme.utils.mapResponsiveScale(zIndex, theme.elevation),
  });
};

// Flex shorthand / adjustments
// ------------------------------

const flexMap = {
  alignItems: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  },
  justifyContent: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    spaceBetween: 'space-between',
    stretch: 'stretch',
  },
  flexDirection: {
    row: 'row',
    rowReverse: 'row-reverse',
    column: 'column',
    columnReverse: 'column-reverse',
  },
} as const;
