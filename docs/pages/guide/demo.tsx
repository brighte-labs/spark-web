import { Emoji } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Button } from '@spark-web/button';
import { Columns } from '@spark-web/columns';
import { Container } from '@spark-web/container';
import { Field } from '@spark-web/field';
import { Heading } from '@spark-web/heading';
import { Hidden } from '@spark-web/hidden';
import { CheckCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextInput } from '@spark-web/text-input';
import { TextLink } from '@spark-web/text-link';
import { TextList } from '@spark-web/text-list';
import type { NextPage } from 'next';
import type { FormEvent } from 'react';

import { DocsContent } from '../../components/content';

// Force static page building because we have `getInitialProps` in `_app`
export const getStaticProps = () => ({ props: {} });

const DemoPage: NextPage = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <DocsContent pageTitle="Demo">
      <Container>
        <Stack gap="xxlarge" dividers>
          <Stack gap="xlarge">
            <Heading level="1">Demo</Heading>
            <Columns gap="xxlarge" template={[8, 4]} collapseBelow="desktop">
              <Stack gap="xlarge">
                <Text size="large" tone="muted">
                  We can see how the components behave in isolation, but
                  it&apos;s important to make sure everything works in concert.
                </Text>
                <Text size="large" tone="muted">
                  Below are are some{' '}
                  <TextLink href="/package/field">Field</TextLink> components,
                  composed using the{' '}
                  <TextLink href="/package/stack">Stack</TextLink> and{' '}
                  <TextLink href="/package/columns">Columns</TextLink> layout
                  primitives.
                </Text>
              </Stack>
            </Columns>
          </Stack>
          <Columns gap="xxlarge" template={[8, 4]} collapseBelow="desktop">
            <main>
              <form onSubmit={handleSubmit}>
                <Stack gap="xlarge">
                  <Columns gap="large" collapseBelow="tablet">
                    <Field label="Name">
                      <TextInput placeholder="e.g. John" />
                    </Field>
                    <Field label="Last name" labelVisibility="reserve-space">
                      <TextInput placeholder="e.g. Smith" />
                    </Field>
                  </Columns>

                  <Field
                    label="Email"
                    description="Stored securely, never shared"
                  >
                    <TextInput type="email" />
                  </Field>

                  <Columns gap="large" template={[8, 4]}>
                    <Field label="Address" secondaryLabel="(Optional)">
                      <TextInput />
                    </Field>
                    <Field label="Postcode" secondaryLabel="(Optional)">
                      <TextInput />
                    </Field>
                  </Columns>

                  <Field
                    label="Other"
                    message="This field is required"
                    tone="critical"
                  >
                    <TextInput type="email" />
                  </Field>

                  <Inline>
                    <Button type="submit">Submit</Button>
                  </Inline>
                </Stack>
              </form>
            </main>

            <Hidden below="desktop" as="aside">
              <Stack gap="xlarge">
                <Heading level="2">Sidebar</Heading>
                <Text>
                  Sidebar content,{' '}
                  <TextLink href="/package/hidden">hidden</TextLink> below the
                  &ldquo;desktop&rdquo; breakpoint.
                </Text>
                <Box paddingLeft="large">
                  <TextList size="small">
                    <Text>
                      This is a{' '}
                      <TextLink href="/package/text-list">list</TextLink> of
                      items
                    </Text>
                    <Stack gap="large">
                      <Text>That&apos;s highly customisable</Text>
                      <TextList icon={<CheckCircleIcon size="xxsmall" />}>
                        <Text>
                          We can use Spark&apos;s{' '}
                          <TextLink href="/package/icon">icons</TextLink>
                        </Text>
                        <Text>For the bullet element</Text>
                      </TextList>
                    </Stack>
                    <Text>Pretty cool!</Text>
                  </TextList>
                </Box>
                <Text>
                  Text may contain{' '}
                  <TextLink href="/package/a11y">emojis</TextLink>{' '}
                  <Emoji symbol="🎉" label="(hooray!)" />, which are accessible
                  to assistive tech users.
                </Text>
              </Stack>
            </Hidden>

            <Hidden above="mobile">
              <Stack gap="xlarge" as="aside">
                <Heading level="2">Mobile only</Heading>
                <Text>
                  This block of content is hidden above the &ldquo;mobile&rdquo;
                  breakpoint.
                </Text>
              </Stack>
            </Hidden>
          </Columns>
        </Stack>
      </Container>
    </DocsContent>
  );
};

export default DemoPage;
