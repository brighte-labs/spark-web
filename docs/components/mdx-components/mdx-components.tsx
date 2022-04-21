import type { HeadingProps } from '@spark-web/heading';
import { Heading } from '@spark-web/heading';
import type { TextProps } from '@spark-web/text';
import { Strong, Text } from '@spark-web/text';
import { TextLink } from '@spark-web/text-link';
import type { TextListProps } from '@spark-web/text-list';
import { TextList } from '@spark-web/text-list';
import { Fragment } from 'react';

import * as sparkComponents from '../../cache/spark-components';
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

function Code({
  children,
  className,
  demo,
  initialCompiledResult,
  live,
  metastring,
}: CodeProps): JSX.Element {
  return (
    <CodeBlock
      className={className}
      code={children.trim()}
      demo={demo}
      initialCompiledResult={initialCompiledResult}
      live={live}
      scope={sparkComponents}
      metastring={metastring}
    />
  );
}

export const mdxComponents: Record<string, React.ReactNode> = {
  // Native HTML elements
  a: TextLink,
  p: (props: TextProps) => {
    return <Text as="p" {...props} />;
  },
  h1: ({ level = '1', ...props }: HeadingProps) => {
    return <Heading level={level} {...props} />;
  },
  h2: ({ level = '2', ...props }: HeadingProps) => {
    return <Heading level={level} {...props} />;
  },
  h3: ({ level = '3', ...props }: HeadingProps) => {
    return <Heading level={level} {...props} />;
  },
  h4: ({ level = '4', ...props }: HeadingProps) => {
    return <Heading level={level} {...props} />;
  },
  strong: Strong,
  ul: (props: TextListProps) => <TextList {...props} type="bullet" />,
  ol: (props: TextListProps) => <TextList {...props} type="number" />,
  li: Text,
  table: MdxTable,
  thead: MdxThead,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  // avoid wrapping live examples in pre tag
  pre: Fragment,
  code: Code,
  inlineCode: InlineCode,
  // Design System Components
  ...sparkComponents,
};
