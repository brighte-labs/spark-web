import { Box } from '@spark-web/box';
import type { NativeButtonProps } from '@spark-web/button/src/types';
import type { ReactNode } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  handleClick: NativeButtonProps['onClick'];
  children: ReactNode;
};

export const IconButton = ({ handleClick, children }: IconButtonProps) => {
  return (
    <>
      <Box as="button" onClick={handleClick} {...useIconButtonStyles()}>
        {children}
      </Box>
    </>
  );
};
