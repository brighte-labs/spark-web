import { composeId, mergeIds, useId, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactElement, ReactNode } from 'react';
import { forwardRef, Fragment } from 'react';

import type { FieldContextType } from './context';
import { FieldContextProvider } from './context';
import { FieldLabelWrapper } from './Field-Label-Wrapper';
import { FieldMessage } from './Field-Message';

export const messageToneMap = {
  critical: 'critical',
  neutral: 'muted',
  positive: 'positive',
} as const;

export type Tone = keyof typeof messageToneMap;

export type FieldProps = {
  id?: string;
  data?: DataAttributeMap;

  /** Optionally provide a utility or contextual hint, related to the field. */
  adornment?: ReactElement;
  /** Input component  */
  children: ReactNode;
  /**
   * Indicates that the field is perceivable but disabled, so it is not editable
   * or otherwise operable.
   */
  disabled?: boolean;
  /** Provide additional information that will aid user input. */
  description?: string;
  /** Concisely label the field. */
  label: string;
  /**
   * The label must always be provided for assistive technology, but you may
   * hide it from sighted users when the intent can be inferred from context.
   */
  labelVisibility?: 'hidden' | 'reserve-space' | 'visible';
  /** Provide a message, informing the user about changes in state. */
  message?: string;
  /** Additional context, typically used to indicate that the field is optional. */
  secondaryLabel?: string;
  /** Provide a tone to influence elements of the field, and its input. */
  tone?: Tone;
};

/**
 * Using a [context](https://reactjs.org/docs/context.html), the field
 * component connects the label, description, and message to the input element.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      id: idProp,
      data,

      description,
      disabled = false,
      label,
      adornment,
      labelVisibility = 'visible',
      message,
      secondaryLabel,
      tone = 'neutral',
    },
    forwardedRef
  ) => {
    const { descriptionId, inputId, messageId } = useFieldIds(idProp);

    // field context
    const invalid = Boolean(message && tone === 'critical');
    const fieldContext: FieldContextType = [
      { disabled, invalid },
      {
        'aria-describedby': mergeIds(
          message && messageId,
          description && descriptionId
        ),
        'aria-invalid': invalid || undefined,
        id: inputId,
      },
    ];

    // label prep
    const hiddenLabel = (
      <VisuallyHidden as="label" htmlFor={inputId}>
        {label} {secondaryLabel}
      </VisuallyHidden>
    );
    const labelElement = {
      hidden: hiddenLabel,
      visible: (
        <Box as="label" htmlFor={inputId}>
          <Text tone={disabled ? 'disabled' : 'neutral'} weight="semibold">
            {label}{' '}
            {secondaryLabel && (
              <Text
                inline
                tone={disabled ? 'disabled' : 'muted'}
                weight="regular"
              >
                {secondaryLabel}
              </Text>
            )}
          </Text>
        </Box>
      ),
      'reserve-space': (
        <Fragment>
          {hiddenLabel}
          <Text aria-hidden>&nbsp;</Text>
        </Fragment>
      ),
    };

    const LabelWrapper =
      labelVisibility === 'hidden' ? Fragment : FieldLabelWrapper;

    return (
      <FieldContextProvider value={fieldContext}>
        <Stack ref={forwardedRef} data={data} gap="medium">
          <LabelWrapper>
            {labelElement[labelVisibility]}
            {adornment}
          </LabelWrapper>

          {description && (
            <Text tone="muted" size="small" id={descriptionId}>
              {description}
            </Text>
          )}

          {children}

          {message && (
            <FieldMessage tone={tone} id={messageId} message={message} />
          )}
        </Stack>
      </FieldContextProvider>
    );
  }
);
Field.displayName = 'Field';

// Utils
// ------------------------------

export function useFieldIds(id?: string) {
  const inputId = useId(id);
  const descriptionId = composeId(inputId, 'description');
  const messageId = composeId(inputId, 'message');

  return { descriptionId, inputId, messageId };
}
