import { css } from '@emotion/css';
import { composeId, useFocusRing, useId } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Stack } from '@spark-web/stack';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';
import { forwardRef, Fragment } from 'react';

import { useRadioGroupContext } from './context';
import { RadioPrimitive, useTransitionProperties } from './radio-primitive';
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
    const [boxProps, radioCardStyles] = useRadioCardStyles(isDisabled);

    const inputId = useId();
    const labelId = composeId(inputId, 'label');
    const descriptionId = composeId(inputId, 'description');

    return (
      <Stack
        {...boxProps}
        as="label"
        htmlFor={inputId}
        className={css(radioCardStyles)}
      >
        <Box alignItems="start" display="inline-flex" gap={size}>
          <RadioPrimitive
            {...inputProps}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={labelId}
            data={data}
            disabled={isDisabled}
            id={inputId}
            ref={forwardedRef}
            size={size}
          />
          <Stack gap="large">
            <DefaultTextPropsProvider
              tone={isDisabled ? 'disabled' : 'neutral'}
              weight={description ? 'semibold' : 'regular'}
            >
              <Content id={labelId}>{children}</Content>
            </DefaultTextPropsProvider>
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

function Content({ children, id }: { children: ReactNode; id: string }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text id={id}>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}

export function useRadioCardStyles(isDisabled: boolean) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();

  const transitionProperties = useTransitionProperties();

  return [
    // Box props to be spread onto label
    {
      background: isDisabled ? 'inputDisabled' : 'surface',
      cursor: isDisabled ? 'default' : 'pointer',
      padding: 'large',
      position: 'relative',
      userSelect: 'none',
    },
    {
      // Simulates a border for the radio card
      'input[type=radio] + [data-radio-border=true]': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderColor: theme.border.color.field,
        borderStyle: 'solid',
        borderWidth: theme.border.width.standard,
        borderRadius: theme.border.radius.small,
        pointerEvents: 'none',
        ...transitionProperties,
      },

      // Change border color of card on hover (when not disabled)
      ':hover input:not([disabled], [aria-disabled=true]) + [data-radio-border=true]':
        {
          borderColor: theme.border.color.primaryHover,
        },

      // Focus styles for card
      'input[type=radio]:focus + [data-radio-border=true]': {
        borderColor: theme.border.color.primary,
        ...focusRingStyles,
      },

      // Remove focus ring on radio (as it is on the whole card)
      'input[type=radio]:focus': {
        boxShadow: 'none',
      },

      // Border style for card when checked
      'input[type=radio]:checked + [data-radio-border=true]': {
        borderColor: isDisabled
          ? theme.border.color.field
          : theme.border.color.primary,
        borderWidth: theme.border.width.large,
      },
    },
  ] as const;
}
