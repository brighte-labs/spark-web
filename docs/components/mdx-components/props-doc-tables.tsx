import type { PropsType } from './mdx-components';
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
