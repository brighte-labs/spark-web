import { css } from '@emotion/css';
import { composeId, mergeIds, useId, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { CheckCircleIcon, ExclamationCircleIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { ReactElement, ReactNode } from 'react';
import { forwardRef, Fragment } from 'react';

import { FieldContextProvider } from './context';

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
    const fieldContext = {
      'aria-describedby': mergeIds(
        message && messageId,
        description && descriptionId
      ),
      id: inputId,
      disabled,
      invalid: Boolean(message && tone === 'critical'),
    };

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
          <Text
            inline
            tone={disabled ? 'disabled' : 'neutral'}
            weight="semibold"
          >
            {label}{' '}
            {secondaryLabel && (
              <Text inline tone={disabled ? 'disabled' : 'muted'}>
                {secondaryLabel}
              </Text>
            )}
          </Text>
        </Box>
      ),
      'reserve-space': (
        <Fragment>
          {hiddenLabel}
          <Text inline aria-hidden>
            &nbsp;
          </Text>
        </Fragment>
      ),
    };

    return (
      <FieldContextProvider value={fieldContext}>
        <Stack
          gap={labelVisibility === 'hidden' ? undefined : 'small'}
          ref={forwardedRef}
          {...(data ? buildDataAttributes(data) : null)}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="spaceBetween"
            gap="large"
          >
            {labelElement[labelVisibility]}
            {adornment}
          </Box>

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

// Styled components
// ------------------------------

const messageToneMap = {
  critical: 'critical',
  neutral: 'muted',
  positive: 'positive',
} as const;

// NOTE: use icons in addition to color for folks with visions issues
const messageIconMap = {
  critical: ExclamationCircleIcon,
  neutral: null,
  positive: CheckCircleIcon,
} as const;

type FieldMessageProps = Required<Pick<FieldProps, 'message' | 'id' | 'tone'>>;
export const FieldMessage = ({ message, id, tone }: FieldMessageProps) => {
  const textTone = messageToneMap[tone];
  const Icon = messageIconMap[tone];

  return (
    <Box display="flex" gap="xsmall">
      {Icon ? (
        <IndicatorContainer>
          <Icon size="xxsmall" tone={tone} />
        </IndicatorContainer>
      ) : null}
      <Text tone={textTone} size="small" id={id}>
        {message}
      </Text>
    </Box>
  );
};

function IndicatorContainer({ children, ...props }: { children: ReactNode }) {
  const { typography, utils } = useTheme();
  const { mobile, tablet } = typography.text.small;
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
    >
      {children}
    </Box>
  );
}
