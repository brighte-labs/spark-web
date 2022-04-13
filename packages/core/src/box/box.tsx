import { css, cx } from '@emotion/css';
import type { ReactNode } from 'react';

import { renderBackgroundProvider } from './box/background-context';
import { forwardRefWithAs } from './forward-ref-with-as';
import { resetElementStyles } from './reset-element-styles';
import { useBoxProps } from './use-box-props';
import type { BoxStyleProps } from './use-box-styles';

export type BoxProps = {
  children?: ReactNode;

  /** An identifier which must be unique in the whole document. */
  id?: string;

  // experiment
  className?: string;

  // TODO: this API is less than ideal, consider alternative
  /**
   * When providing a component using the "as" prop, optionally tell the system
   * what the underlying element will be. Used internally to manage reset
   * styles.
   */
  asElement?: keyof HTMLElementTagNameMap;
} & BoxStyleProps;

/** Exposes a prop-based API for adding styles to a view, within the constraints of the theme. */
export const Box = forwardRefWithAs<'div', BoxProps>(
  ({ as: Tag = 'div', asElement, className, id, ...props }, forwardedRef) => {
    const { styles, attributes } = useBoxProps(props);
    const resetStyles = resetElementStyles(asElement ?? Tag);

    const element = (
      <Tag
        ref={forwardedRef}
        id={id}
        className={cx(css(resetStyles), css(styles), className)}
        {...attributes}
      />
    );

    return renderBackgroundProvider(props.background, element);
  }
);
