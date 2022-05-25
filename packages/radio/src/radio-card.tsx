import { useId } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Content } from '@spark-web/control-label';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { forwardRef } from 'react';

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
            <Content id={labelId} weight={description ? 'semibold' : 'regular'}>
              {children}
            </Content>
            {description && (
              <Text id={descriptionId} tone="muted">
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
