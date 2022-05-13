import { Box } from '@spark-web/box';
import type { NativeButtonProps } from '@spark-web/button/src/types';
import type { ReactNode } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  handleClick: NativeButtonProps['onClick'];
  children: ReactNode;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
};

export const IconButton = ({
  handleClick,
  children,
  ...rest
}: IconButtonProps) => {
  return (
    <>
      <Box
        as="button"
        onClick={handleClick}
        {...useIconButtonStyles()}
        {...rest}
      >
        {children}
      </Box>
    </>
  );
};
