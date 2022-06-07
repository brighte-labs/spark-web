import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick'
>;

type IconButtonProps = NativeButtonProps & {
  onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: ReactElement<IconProps>;
};

export const IconButton = (props: IconButtonProps) => {
  return (
    <Box {...props} {...useIconButtonStyles()} as="button" type="button" />
  );
};
