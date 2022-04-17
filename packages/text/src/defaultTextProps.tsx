import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { UseTextProps } from './useText';

type DefaultTextProps = {
  size?: NonNullable<UseTextProps['size']>;
  tone?: NonNullable<UseTextProps['tone']>;
  weight?: NonNullable<UseTextProps['weight']>;
};

const DefaultTextPropsContext = createContext<DefaultTextProps>({
  size: undefined,
  tone: undefined,
  weight: undefined,
});

export function DefaultTextPropsProvider({
  children,
  size,
  tone,
  weight,
}: DefaultTextProps & { children: ReactNode }) {
  const defaultTextProps = useMemo(
    () => ({ size, tone, weight }),
    [size, tone, weight]
  );

  return (
    <DefaultTextPropsContext.Provider value={defaultTextProps}>
      {children}
    </DefaultTextPropsContext.Provider>
  );
}

export const useDefaultTextProps = ({
  size: sizeProp,
  tone: toneProp,
  weight: weightProp,
}: DefaultTextProps) => {
  const { size, tone, weight } = useContext(DefaultTextPropsContext);

  return {
    size: sizeProp ?? size ?? 'standard',
    tone: toneProp ?? tone ?? 'neutral',
    weight: weightProp ?? weight ?? 'regular',
  };
};
