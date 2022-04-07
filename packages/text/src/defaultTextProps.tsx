import { createContext, useContext, useMemo } from 'react';

import { UseTextProps } from './useText';

// TODO: remove "leading" prop

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

export const DefaultTextPropsProvider: React.FC<DefaultTextProps> = ({
  children,
  size,
  tone,
  weight,
}) => {
  const defaultTextProps = useMemo(
    () => ({ size, tone, weight }),
    [size, tone, weight]
  );

  return (
    <DefaultTextPropsContext.Provider value={defaultTextProps}>
      {children}
    </DefaultTextPropsContext.Provider>
  );
};

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
