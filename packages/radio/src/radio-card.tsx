import { useId } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Stack } from '@spark-web/stack';
import type { TextProps } from '@spark-web/text';
import { Text } from '@spark-web/text';
import type { ReactNode } from 'react';
import { forwardRef, Fragment } from 'react';

import { useRadioGroupContext } from './context';
import { RadioPrimitive } from './radio-primitive';
import type { RadioCardProps } from './types';
import { useRadioGroupItem } from './use-radio-group-state';

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  (
    { children, data, description, disabled, ...consumerProps },
    forwardedRef
  ) => {
    const groupState = useRadioGroupContext();
    const radioGroupItemProps = useRadioGroupItem({
      props: consumerProps,
      state: groupState,
    });
    const inputProps =
      typeof groupState === 'undefined' ? consumerProps : radioGroupItemProps;

    const isDisabled = disabled ?? groupState?.disabled ?? false;
    const size = 'small';

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    return (
      <Stack
        as="label"
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        htmlFor={id}
        // Styles
        background={isDisabled ? 'inputDisabled' : 'surface'}
        cursor={isDisabled ? 'default' : 'pointer'}
        padding="large"
        position="relative"
      >
        <Box
          display="inline-flex"
          alignItems="start"
          gap={size}
          userSelect="none"
        >
          <RadioPrimitive
            {...inputProps}
            data={{ ...data, 'radio-card': 'true' }}
            ref={forwardedRef}
            disabled={isDisabled}
            size={size}
            id={id}
          />
          <Stack gap="large">
            <Content
              id={labelId}
              /**
               * If no description is provided, use a lighter font-weight
               * users can provide their own Text if they need to override this
               */
              tone={isDisabled ? 'disabled' : 'neutral'}
              weight={description ? 'semibold' : 'regular'}
            >
              {children}
            </Content>
            {description && (
              <Text id={descriptionId} tone={isDisabled ? 'disabled' : 'muted'}>
                {description}
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    );
  }
);

RadioCard.displayName = 'RadioCard';

function Content({
  children,
  ...textProps
}: { children: ReactNode } & Pick<TextProps, 'id' | 'tone' | 'weight'>) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text {...textProps}>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}
