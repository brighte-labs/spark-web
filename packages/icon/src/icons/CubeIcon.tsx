import { Fragment } from 'react';

import { createIcon } from '../createIcon';

export const CubeIcon = createIcon(
  <Fragment>
    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
  </Fragment>,
  'CubeIcon'
);
