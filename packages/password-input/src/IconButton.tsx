import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  handleClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: ReactElement<IconProps>;
  'aria-pressed'?: boolean;
};

export const IconButton = ({
  handleClick,
  children,
  ...rest
}: IconButtonProps) => {
  return (
    <Box
      {...rest}
      {...useIconButtonStyles()}
      as="button"
      type="button"
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};
