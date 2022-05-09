import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';

import { mdxComponents } from './mdx-components';

export function MDXContent({ code }: { code: string }) {
  useLiveReload();
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
