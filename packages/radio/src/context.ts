import { createContext, useContext } from 'react';

import type { useRadioGroupState } from './use-radio-group-state';

export type RadioGroupState = ReturnType<typeof useRadioGroupState>;

export const RadioGroupContext = createContext<RadioGroupState | undefined>(
  undefined
);
export const useRadioGroupContext = () => useContext(RadioGroupContext);
