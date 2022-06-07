import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  'aria-label': string;
  'aria-pressed'?: boolean;
  children: ReactElement<IconProps>;
  handleClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
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
