import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import type { ComponentDoc, Props } from 'react-docgen-typescript';

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
  // Sort the required props before the non-required props
  // Then sort alphabetically
  const props = Object.entries(propsData).sort(([, a], [, b]) => {
    // If they have different required-ness, sort them in different buckets
    if (a.required !== b.required) {
      if (a.required) {
        return -1;
      } else {
        return 1;
      }
    }
    // Alphabetically sort the props if they're in the same "required"-ness
    // portion
    if (a.type.name < b.type.name) {
      return 1;
    } else {
      return -1;
    }
  });

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

      {props.map(([key, prop]) => (
        <MdxTr key={key}>
          <MdxTd>
            {key}
            {prop.required ? '' : '?'}
          </MdxTd>
          <MdxTd>{prop.type.name}</MdxTd>
          <MdxTd>
            {typeof prop.defaultValue?.value !== 'undefined'
              ? JSON.stringify(prop.defaultValue.value)
              : null}
          </MdxTd>
          <MdxTd>{prop.description}</MdxTd>
        </MdxTr>
      ))}
    </MdxTable>
  );
};
