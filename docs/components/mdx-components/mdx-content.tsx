import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';

import { DataContext, mdxComponents } from './mdx-components';

export function MDXContent({
  code,
  data,
}: {
  code: string;
  data: Record<string, any>;
}) {
  useLiveReload();
  const Component = useMDXComponent(code);
  return (
    <DataContext.Provider value={data}>
      <Component components={mdxComponents} />
    </DataContext.Provider>
  );
}
