import { Button } from '@spark-web/button';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ContentDialog } from './content-dialog';

export default {
  title: 'Feedback & Overlays / Content Dialog',
  component: ContentDialog,
} as ComponentMeta<typeof ContentDialog>;

const ContentDialogStory: ComponentStory<typeof ContentDialog> = () => (
  <ContentDialog
    title="Here's a title"
    description="Content dialog"
    trigger={<Button>Open dialog</Button>}
  >
    <Text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
      optio molestiae dolorem qui omnis reiciendis dignissimos numquam aperiam,
      rem natus, totam, repudiandae cum voluptatibus quos? Dicta, odio!
      Accusantium, reiciendis quidem.
    </Text>
  </ContentDialog>
);
export const Default = ContentDialogStory.bind({});

Default.args = {};
