import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { useComposedRefs } from '@spark-web/utils';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef, useCallback, useRef } from 'react';

import type { NativeButtonProps } from './types';

export type BaseButtonProps = NativeButtonProps & Partial<BoxProps>;

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { onClick: onClickProp, disabled = false, type = 'button', ...rest },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(internalRef, forwardedRef);
    /**
     * In Safari buttons are not focused automatically by the browser once
     * pressed, the default behaviour is to focus the nearest focusable ancestor.
     * To fix this we need to manually focus the button element after the user
     * presses the element.
     */
    const onClick = useCallback(
      (event: ReactMouseEvent<HTMLButtonElement>) => {
        internalRef.current?.focus();
        const preventableClickHandler = getPreventableClickHandler(
          onClickProp,
          disabled
        );
        preventableClickHandler(event);
      },
      [disabled, onClickProp]
    );

    return (
      <Box
        as="button"
        {...rest}
        onClick={onClick}
        ref={composedRef}
        type={type}
      />
    );
  }
);

BaseButton.displayName = 'BaseButton';

/**
 * handle "disabled" behaviour w/o disabling buttons
 * @see https://axesslab.com/disabled-buttons-suck/
 */
export function getPreventableClickHandler(
  onClick: BaseButtonProps['onClick'],
  disabled: boolean
) {
  return function handleClick(
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick?.(event);
    }
  };
}
