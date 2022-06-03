import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import type { ComponentDoc, Props } from 'react-docgen-typescript';

import { MdxTable, MdxTd, MdxTh, MdxThead, MdxTr } from './mdx-table';

export const ComponentPropsDocTables = ({
  propsDoc,
}: {
  propsDoc: ComponentDoc | undefined;
}) => {
  if (!propsDoc || !Object.keys(propsDoc.props).length) {
    return null;
  }
  return (
    <Stack key={propsDoc.displayName} gap="medium">
      <Heading level="4">{propsDoc.displayName} Props</Heading>
      <PropsTable propsData={propsDoc.props} />
    </Stack>
  );
};

const PropsTable = ({ propsData }: { propsData: Props }) => {
  // Sort the required props before the non-required props,
  // Then sort alphabetically
  const props = Object.entries(propsData)
    .map(([key, prop]) => {
      let type = prop.type.name;
      if (prop.type.name === 'enum') {
        if (prop.type.raw) {
          if (
            prop.type.raw.includes('|') ||
            ['boolean' /* TODO: more? */].includes(prop.type.raw)
          ) {
            type = prop.type.raw;
          } else {
            type = `${prop.type.raw}: ${prop.type.value
              .map(({ value }: { value: any }) => value)
              .join(' | ')}`;
          }
        } else if (prop.type.value) {
          type = prop.type.value
            .map(({ value }: { value: any }) => value)
            .join(' | ');
        }
      }
      return {
        name: key,
        required: prop.required,
        type,
        ...(typeof prop.defaultValue?.value !== 'undefined' && {
          defaultValue: prop.defaultValue.value,
        }),
        description: prop.description,
      };
    })
    .sort((a, b) => {
      // If they have different required-ness, sort them in different buckets
      if (a.required !== b.required) {
        if (a.required) {
          return -1;
        } else {
          return 1;
        }
      }
      // Alphabetically sort the props if they're in the same required-ness
      // bucket
      return a.name.localeCompare(b.name);
    });

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

      {props.map(prop => (
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
