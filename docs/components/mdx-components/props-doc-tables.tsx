import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';

import type { PropsType } from './mdx-components';
import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export type FormattedPropsType = {
  [key: string]: PropsType;
};

export const ComponentPropsDocTables = ({
  propsDoc,
}: {
  propsDoc:
    | { displayName: string; props: Record<string, PropsType> }
    | undefined;
}) => {
  if (!propsDoc || !Object.keys(propsDoc?.props).length) {
    return null;
  }
  return (
    <Stack key={propsDoc.displayName} gap="medium">
      <Heading level="4">{propsDoc.displayName} Props</Heading>
      <PropsTable props={propsDoc.props} />
    </Stack>
  );
};

const PropsTable = ({ props }: { props: Record<string, PropsType> }) => {
  if (!Object.keys(props).length) {
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

      {Object.keys(props).map((key: string) => {
        const prop = props[key];
        return (
          <MdxTr key={prop.name}>
            <MdxTd>
              {prop.name}
              {prop.required ? '' : '?'}
            </MdxTd>
            <MdxTd>{prop.type}</MdxTd>
            <MdxTd>{JSON.stringify(prop.defaultValue)}</MdxTd>
            <MdxTd>{prop.description}</MdxTd>
          </MdxTr>
        );
      })}
    </MdxTable>
  );
};
