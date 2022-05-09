import { css, keyframes } from '@emotion/css';
import type {
  AccordionItemProps as RadixAccordionItemProps,
  AccordionMultipleProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Box } from '@spark-web/box';
import { Heading } from '@spark-web/heading';
import { ChevronDownIcon } from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/src/internal';
import type { RefAttributes } from 'react';

const openAnimation = keyframes({
  from: {
    height: 0,
    opacity: 0,
  },
  to: {
    height: 'var(--radix-accordion-content-height)',
    opacity: 1,
  },
});

const closeAnimation = keyframes({
  from: {
    height: 'var(--radix-accordion-content-height)',
    opacity: 1,
  },
  to: {
    height: 0,
    opacity: 0,
  },
});

export type AccordionItemProps = Pick<
  RadixAccordionItemProps,
  'children' | 'value'
> & {
  data?: DataAttributeMap;
  headingElement?: 'h2' | 'h3' | 'h4';
  label: string;
  level?: '1' | '2' | '3' | '4';
};

export function AccordionItem({
  headingElement = 'h3',
  children,
  data,
  label,
  level,
  value,
}: AccordionItemProps): JSX.Element {
  const { animation } = useTheme();
  return (
    <AccordionPrimitive.Item value={value} asChild>
      <Box
        data={data}
        background="surface"
        borderRadius="medium"
        padding="large"
      >
        <AccordionPrimitive.Header asChild>
          <Heading as={headingElement ?? 'h3'} level={level ?? '3'}>
            <AccordionPrimitive.Trigger asChild>
              <Box
                display="flex"
                justifyContent="spaceBetween"
                alignItems="start"
                gap="small"
              >
                <Box flex={1}>{label}</Box>
                <Box display="flex" alignItems="center">
                  {/* Zero-width space character, used to align chevron properly with label text */}
                  &#8203;
                  <ChevronDownIcon size="xsmall" />
                </Box>
              </Box>
            </AccordionPrimitive.Trigger>
          </Heading>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content
          className={css({
            '@media screen and (prefers-reduced-motion: no-preference)': {
              '&[data-state="open"]': {
                animation: `${openAnimation} ${animation.standard.duration}ms ${animation.standard.easing}`,
              },
              '&[data-state="closed"]': {
                animation: `${closeAnimation} ${animation.standard.duration}ms ${animation.standard.easing}`,
              },
            },
          })}
        >
          <Box paddingTop="xlarge">{children}</Box>
        </AccordionPrimitive.Content>
      </Box>
    </AccordionPrimitive.Item>
  );
}

export type AccordionProps =
  | (Omit<AccordionSingleProps, 'asChild'> & RefAttributes<HTMLDivElement>)
  | (Omit<AccordionMultipleProps, 'asChild'> & RefAttributes<HTMLDivElement>);

export function Accordion({ children, ...rest }: AccordionProps): JSX.Element {
  return (
    <AccordionPrimitive.Root asChild {...rest}>
      <Stack gap="medium" width="full">
        {children}
      </Stack>
    </AccordionPrimitive.Root>
  );
}
