import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import type { StackProps } from '@spark-web/stack';
import { Stack } from '@spark-web/stack';
import type {
  TextProps } from '@spark-web/text';
import {
  DefaultTextPropsProvider,
  Text,
  useDefaultTextProps,
  useForegroundTone,
} from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
import type { ReactElement, ReactNode } from 'react';
import { Children, forwardRef } from 'react';

export const BULLET_ELEMENT_ID = 'text-list-bullet';
export const NUMBER_ELEMENT_ID = 'text-list-number';

const typeToElement = {
  bullet: 'ul',
  number: 'ol',
} as const;

type ListElement = HTMLUListElement | HTMLOListElement;

export type TextListProps = {
  /** The elements that represent each item in the list. */
  children: ReactNode;
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /** The size of the gap between each item. */
  gap?: StackProps['gap'];
  /** Provide an icon to be used as the "bullet" element. */
  icon?: ReactElement<IconProps>;
  /** Default the size of child Text elements. */
  size?: TextProps['size'];
  /** Default the tone of child Text elements. */
  tone?: TextProps['tone'];
  /** Define the list type. Equivalent to HTML's ordered and unordered lists. */
  type?: keyof typeof typeToElement;
};

/** Organize and emphasize information quickly and effectively in a list of text elements. */
export const TextList = forwardRef<ListElement, TextListProps>(
  (
    {
      children,
      data,
      icon,
      gap = 'large',
      size: sizeProp,
      tone: toneProp,
      type = 'bullet',
      ...consumerProps
    },
    forwardedRef
  ) => {
    const { size, tone } = useDefaultTextProps({
      size: sizeProp,
      tone: toneProp,
    });
    const listItems = Children.toArray(children) as ReactElement[]; // remove falsy values before mapping, keeps the index in sync
    const element = typeToElement[type];

    return (
      <DefaultTextPropsProvider size={size} tone={tone}>
        <Stack
          as={element}
          ref={forwardedRef}
          gap={gap}
          {...(data ? buildDataAttributes(data) : null)}
          {...consumerProps}
        >
          {listItems.map((listItem, index) => {
            return (
              <Box
                display="flex"
                as="li"
                gap="small"
                key={listItem.key || index}
              >
                <IndicatorContainer size={size}>
                  {(() => {
                    if (icon) {
                      return icon;
                    }

                    if (type === 'number') {
                      return (
                        <Character
                          length={listItems.length.toString().length}
                          value={String(index + 1)}
                        />
                      );
                    }

                    return <Bullet size={size} tone={tone} />;
                  })()}
                </IndicatorContainer>

                <Box flex={1}>{listItem}</Box>
              </Box>
            );
          })}
        </Stack>
      </DefaultTextPropsProvider>
    );
  }
);

// Styled components
// ------------------------------

const bulletSize = {
  xsmall: 4,
  small: 4,
  standard: 5,
  large: 5,
} as const;

export const IndicatorContainer = ({
  size = 'standard',
  ...props
}: TextProps) => {
  const { typography, utils } = useTheme();
  const { mobile, tablet } = typography.text[size];
  const responsiveStyles = utils.responsiveStyles({
    mobile: { height: mobile.capHeight },
    tablet: { height: tablet.capHeight },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      aria-hidden
      cursor="default"
      flexShrink={0}
      className={css(responsiveStyles)}
      {...props}
    />
  );
};

const Bullet = ({ size = 'standard', tone = 'neutral' }: TextProps) => {
  const backgroundColor = useForegroundTone(tone);
  const dimensions = bulletSize[size];

  return (
    <div className={css({ width: '1ex' })}>
      <div
        className={css({
          backgroundColor,
          borderRadius: dimensions,
          height: dimensions,
          width: dimensions,
        })}
      />
    </div>
  );
};

const Character = ({ length, value }: { length: number; value: string }) => {
  // Offset characters to meet the "longest" value in the list. Hidden from
  // sighted and assistive tech users.
  const offset = length - value.length;
  const offsetElement = offset ? (
    <Box as="span" opacity={0}>
      {'0'.repeat(offset)}
    </Box>
  ) : null;

  return (
    <Text tabularNumbers>
      {offsetElement}
      {value}.
    </Text>
  );
};
