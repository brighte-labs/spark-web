import { createContext, useContext } from 'react';

export type FieldState = {
  disabled: boolean;
  invalid: boolean;
};

export type InputPropsDerivedFromField = {
  'aria-describedby'?: string;
  'aria-invalid': true | undefined;
  id: string;
};

export type FieldContextType = [FieldState, InputPropsDerivedFromField];

export const FieldContext = createContext<FieldContextType | null>(null);
export const FieldContextProvider = FieldContext.Provider;

export const FIELD_CONTEXT_ERROR_MESSAGE =
  'Input components must be inside a `Field`.';

export function useFieldContext() {
  const ctx = useContext(FieldContext);

  if (!ctx) {
    throw new Error(FIELD_CONTEXT_ERROR_MESSAGE);
  }

  return ctx;
}
