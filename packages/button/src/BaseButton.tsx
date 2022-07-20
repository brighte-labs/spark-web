import { useButton } from '@react-aria/button';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { useComposedRefs } from '@spark-web/utils';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef, useRef } from 'react';

import type { NativeButtonProps } from './types';

export type BaseButtonProps = NativeButtonProps & Partial<BoxProps>;

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ onClick, disabled: isDisabled, ...rest }, forwardedRef) => {
    /**
     * handle "disabled" behaviour w/o disabling buttons
     * @see https://axesslab.com/disabled-buttons-suck/
     */
    const handleClick = getPreventableClickHandler(
      onClick,
      (isDisabled = false)
    );

    const internalRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(internalRef, forwardedRef);
    const { buttonProps } = useButton(
      {
        onPress: handleClick as any,
        isDisabled,
      },
      internalRef
    );

    return <Box as="button" ref={composedRef} {...rest} {...buttonProps} />;
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
