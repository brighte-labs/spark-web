import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import type { ComponentDoc, PropItem, Props } from 'react-docgen-typescript';

import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export const ComponentPropsDocTables = ({
  componentPropsDoc,
}: {
  componentPropsDoc: ComponentDoc[];
}) => {
  return (
    <>
      {componentPropsDoc.map(PropsDoc => {
        return (
          <Stack key={PropsDoc.displayName} gap="medium">
            <Heading level="2">{PropsDoc.displayName} Props</Heading>
            <PropsTable propsData={PropsDoc.props} />
          </Stack>
        );
      })}
    </>
  );
};

const PropsTable = ({ propsData }: { propsData: Props }) => {
  type PropItemKey = keyof PropItem;
  const propItems = [
    'name',
    'required',
    'type',
    'description',
    'defaultValue',
    'parent',
    'declarations',
    'tags',
  ] as PropItemKey[];

  const propKeys = Object.keys(propsData);

  return (
    <MdxTable>
      <MdxThead>
        <MdxTr>
          {propItems.map(item => (
            <MdxTh key={`${item}-prop-th`}>{item}</MdxTh>
          ))}
        </MdxTr>
      </MdxThead>

      {propKeys.map(key => (
        <MdxTr key={`${key}-prop-tr`}>
          {propItems.map(item => (
            <MdxTd key={`${item}-prop-td`}>
              {JSON.stringify(propsData[key][item])}
            </MdxTd>
          ))}
        </MdxTr>
      ))}
    </MdxTable>
  );
};
