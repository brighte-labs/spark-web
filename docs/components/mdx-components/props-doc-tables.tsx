import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';

import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export const ComponentPropsDocTables = ({
  propsDoc,
}: {
  propsDoc: any | undefined;
}) => {
  if (!propsDoc || !Object.keys(propsDoc.props).length) {
    return null;
  }
  return (
    <Stack key={propsDoc.displayName} gap="medium">
      <Heading level="4">{propsDoc.displayName} Props</Heading>
      <PropsTable props={propsDoc.props} />
    </Stack>
  );
};

const PropsTable = ({ props }: { props: any }) => {
  if (!props.length) {
    return null;
  }

  return (
    <MdxTable>
      <MdxThead>
        <MdxTr>
          <MdxTh>Prop</MdxTh>
          <MdxTh>Type</MdxTh>
          <MdxTh>Default</MdxTh>
          <MdxTh>Description</MdxTh>
        </MdxTr>
      </MdxThead>

      {props.map((prop: any) => (
        <MdxTr key={prop.name}>
          <MdxTd>
            {prop.name}
            {prop.required ? '' : '?'}
          </MdxTd>
          <MdxTd>{prop.type}</MdxTd>
          <MdxTd>{JSON.stringify(prop.defaultValue)}</MdxTd>
          <MdxTd>{prop.description}</MdxTd>
        </MdxTr>
      ))}
    </MdxTable>
  );
};
