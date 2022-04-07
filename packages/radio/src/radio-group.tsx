import { FieldMessage, useFieldIds } from '@spark-web/field';

import { RadioGroupContext } from './context';
import type { RadioGroupProps } from './types';
import { useRadioGroupState } from './use-radio-group-state';

export const RadioGroup = <Value extends string>({
  children,
  id: idProp,
  message,
  tone = 'neutral',
  ...props
}: RadioGroupProps<Value>): JSX.Element => {
  const context = useRadioGroupState(props);
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
