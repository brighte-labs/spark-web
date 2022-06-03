import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import type { ComponentDoc } from 'react-docgen-typescript';

import { DataContext, mdxComponents } from './mdx-components';

export function MDXContent({
  code,
  data,
}: {
  code: string;
  data: ComponentDoc[];
}) {
  useLiveReload();
  const Component = useMDXComponent(code);
  return (
    <DataContext.Provider value={{ props: data }}>
      <Component components={mdxComponents} />
    </DataContext.Provider>
  );
}
