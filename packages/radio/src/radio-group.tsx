import { FieldMessage, useFieldIds } from '@spark-web/field';

import { RadioGroupContext } from './context';
import type { RadioGroupProps } from './types';
import { useRadioGroupState } from './use-radio-group-state';

export const RadioGroup = <Value extends string>({
  children,
  disabled,
  name,
  onChange,
  size,
  value,
  message,
  id: idProp,
  'aria-describedby': ariaDescribedBy,
  tone = 'neutral',
}: RadioGroupProps<Value>): JSX.Element => {
  const context = useRadioGroupState({
    disabled,
    name,
    onChange,
    size,
    value,
    'aria-describedby': ariaDescribedBy,
  });
  const { inputId: radioGroupId, messageId } = useFieldIds(idProp);
  return (
    <RadioGroupContext.Provider
      value={{ ...context, 'aria-describedby': message && messageId }}
    >
      <div id={radioGroupId} role="radiogroup" style={{ display: 'contents' }}>
        {children}
      </div>
      {message && <FieldMessage tone={tone} id={messageId} message={message} />}
    </RadioGroupContext.Provider>
  );
};
