import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { CSSProperties, ReactNode } from 'react';
import { useMemo } from 'react';

import { TextContext, useTextContext } from './context';
import { useDefaultTextProps } from './defaultTextProps';
import type { TextOverflowStrategy } from './useOverflowStrategy';
import { useOverflowStrategy } from './useOverflowStrategy';
import type { UseTextProps } from './useText';
import { useText } from './useText';

type InlineProps = {
  align?: never;
  /** Display as an inline element. */
  inline?: boolean;
  overflowStrategy?: never;
};
type BlockProps = {
  /** The horizontal alignment. */
  align?: 'left' | 'center' | 'right';
  inline?: never;
  /** Manage how text behaves with regard to overflow. */
  overflowStrategy?: TextOverflowStrategy;
};

export type TextProps = Partial<UseTextProps> & {
  /** The text content. */
  children?: ReactNode;
  /** An identifier which must be unique in the whole document. */
  id?: BoxProps['id'];
  /** When enabled, numbers will be the same width. Similar to a monospaced font. */
  tabularNumbers?: boolean;
  /** Transform the text casing. */
  transform?: CSSProperties['textTransform'];
} & (InlineProps | BlockProps);

export const Text = forwardRefWithAs<'div', TextProps>(
  (
    {
      // box props
      as,
      children,
      id,

      //text props
      align,
      baseline: baselineProp,
      inline,
      overflowStrategy,
      size: sizeProp,
      tabularNumbers,
      tone: toneProp,
      transform,
      weight: weightProp,
    },
    forwardedRef
  ) => {
    const overflowStyles = useOverflowStrategy(overflowStrategy);
    const textContext = useTextContext();
    const { size, tone, weight } = useDefaultTextProps({
      size: sizeProp ?? textContext?.size,
      tone: toneProp ?? textContext?.tone,
      weight: weightProp ?? textContext?.weight,
    });
    const baseline = !inline && baselineProp;
    const textStyles = useText({ baseline, size, tone, weight });
    const styles = [
      textStyles,
      {
        display: inline ? 'inline' : 'block',
        fontVariantNumeric: tabularNumbers ? 'tabular-nums' : undefined,
        textAlign: align,
        textTransform: transform,
      },
    ];

    // early exit for inline variant
    if (inline) {
      return (
        <Box
          as={as ?? 'span'}
          ref={forwardedRef}
          id={id}
          className={css(styles)}
        >
          {children}
        </Box>
      );
    }

    // prepare block variant
    const content = overflowStrategy ? (
      <span className={css(overflowStyles)}>{children}</span>
    ) : (
      children
    );
    const textContextValue = useMemo(
      () => ({ size, tone, weight }),
      [size, tone, weight]
    );

    return (
      <TextContext.Provider value={textContextValue}>
        <Box as={as} ref={forwardedRef} id={id} className={css(styles)}>
          {content}
        </Box>
      </TextContext.Provider>
    );
  }
);
