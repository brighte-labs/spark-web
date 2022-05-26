import { FieldMessage, useFieldIds } from '@spark-web/field';
import { Fieldset } from '@spark-web/fieldset';
import { Stack } from '@spark-web/stack';

import { RadioGroupContext } from './context';
import type { RadioGroupProps } from './types';
import { useRadioGroupState } from './use-radio-group-state';

export const RadioGroup = <Value extends string>({
  children,
  id: idProp,
  legend,
  message,
  tone = 'neutral',
  gap = 'large',
  ...props
}: RadioGroupProps<Value>): JSX.Element => {
  const context = useRadioGroupState(props);
  const { inputId: radioGroupId, messageId } = useFieldIds(idProp);
  return (
    <RadioGroupContext.Provider
      value={{ ...context, 'aria-describedby': message && messageId }}
    >
      <Fieldset legend={legend} gap={gap}>
        <Stack id={radioGroupId} role="radiogroup" gap={gap}>
          {children}
        </Stack>
        {message && (
          <FieldMessage tone={tone} id={messageId} message={message} />
        )}
      </Fieldset>
    </RadioGroupContext.Provider>
  );
};
