import type { HeadingProps } from '@spark-web/heading';
import type { TextProps } from '@spark-web/text';
import { Strong, Text } from '@spark-web/text';
import { TextLink } from '@spark-web/text-link';
import type { TextListProps } from '@spark-web/text-list';
import { TextList } from '@spark-web/text-list';
import type { ReactNode } from 'react';
import { Children, Fragment } from 'react';

import * as sparkComponents from '../../cache/spark-components';
import { Heading } from '../../components/content/toc-context';
import { InlineCode } from '../example-helpers';
import { CodeBlock } from './code-block';
import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

interface CodeProps {
  children: string;
  className: string;
  demo: boolean;
  initialCompiledResult: string;
  live: true;
  metastring?: string;
}

function Code({ children, className, demo, ...props }: CodeProps): JSX.Element {
  const trimmedChildren = children.trim();
  // Please forgive me, I had no choice!
  // See: https://github.com/mdx-js/mdx/discussions/1891#discussioncomment-1936179
  const isFencedCodeblock = /language-(\w+)/.exec(className || '');
  return isFencedCodeblock ? (
    <CodeBlock
      className={className}
      code={trimmedChildren}
      demo={demo}
      scope={sparkComponents}
      {...props}
      live
    />
  ) : (
    <InlineCode {...props}>{trimmedChildren}</InlineCode>
  );
}

// MDX v2 passes newlines through as children. This causes our `<TextList>`
// component to render extra `<li>`s (each newline is a child). We strip them
// here before rendering them.
const TextListMdx = (props: TextListProps) => (
  <TextList {...props}>
    {Children.toArray(props.children)?.filter(
      child => typeof child !== 'string' || child.trim()
    )}
  </TextList>
);

export const mdxComponents: Record<string, ReactNode> = {
  // Native HTML elements
  a: TextLink,
  p: (props: TextProps) => {
    return <Text as="p" {...props} />;
  },
  h1: (props: HeadingProps) => <Heading {...props} level="1" />,
  h2: (props: HeadingProps) => <Heading {...props} level="2" />,
  h3: (props: HeadingProps) => <Heading {...props} level="3" />,
  h4: (props: HeadingProps) => <Heading {...props} level="4" />,
  strong: Strong,
  ul: (props: TextListProps) => <TextListMdx {...props} type="bullet" />,
  ol: (props: TextListProps) => <TextListMdx {...props} type="number" />,
  li: Text,
  table: MdxTable,
  thead: MdxThead,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  // avoid wrapping live examples in pre tag
  pre: Fragment,
  code: Code,
  // Design System Components
  ...sparkComponents,
};
