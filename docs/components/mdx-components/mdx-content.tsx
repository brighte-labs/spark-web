import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';

import type { DataContextType } from './mdx-components';
import { DataContext, mdxComponents } from './mdx-components';

export function MDXContent({
  code,
  data,
}: {
  code: string;
  data?: DataContextType;
}) {
  useLiveReload();
  const Component = useMDXComponent(code);
  return (
    <DataContext.Provider value={data ?? null}>
      <Component components={mdxComponents} />
    </DataContext.Provider>
  );
}
