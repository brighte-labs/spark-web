import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';

import type { PropsType } from './mdx-components';
import { InlineCode } from './mdx-components';
import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export type FormattedPropsType = {
  [key: string]: PropsType;
};

export const ComponentPropsDocTables = ({
  propsDoc,
  displayName,
}: {
  propsDoc: { props: Record<string, PropsType> } | undefined;
  displayName: string;
}) => {
  if (!propsDoc || !Object.keys(propsDoc?.props).length) {
    return null;
  }
  return <PropsTable key={displayName} props={propsDoc.props} />;
};

const PropsTable = ({ props }: { props: Record<string, PropsType> }) => {
  if (!Object.keys(props).length) {
    return null;
  }

  return (
    <MdxTable>
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <MdxThead>
        <MdxTr>
          <MdxTh>Prop</MdxTh>
          <MdxTh>Type</MdxTh>
          <MdxTh>Description</MdxTh>
        </MdxTr>
      </MdxThead>

      {Object.keys(props).map((key: string) => {
        const prop = props[key];
        return (
          <MdxTr key={prop.name}>
            <MdxTd>
              <Text as="p" overflowStrategy="breakword">
                {prop.name}
                {prop.required ? '' : '?'}
              </Text>
            </MdxTd>
            <MdxTd>
              <Text as="p" overflowStrategy="breakword">
                {prop.type}
              </Text>
            </MdxTd>
            <MdxTd>
              <Stack gap="xlarge">
                <Text as="p">{prop.description}</Text>
                {typeof prop.defaultValue !== 'undefined' ? (
                  <Text as="p">
                    <strong>Default</strong>:{' '}
                    <InlineCode>{JSON.stringify(prop.defaultValue)}</InlineCode>
                  </Text>
                ) : null}
              </Stack>
            </MdxTd>
          </MdxTr>
        );
      })}
    </MdxTable>
  );
};
