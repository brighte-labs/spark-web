import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { HomeIcon } from '../../icon/src';
import type { NavLinkProps } from './index';
import { NavLink } from './index';

export default {
  title: 'Navigation / NavLink',
  component: NavLink,
} as ComponentMeta<typeof NavLink>;

const LinkStory: ComponentStory<typeof NavLink> = (args: NavLinkProps) => (
  <NavLink {...args} />
);
export const Default = LinkStory.bind({});

Default.args = {
  href: 'https://brighte.com.au',
  children: [<HomeIcon key="1" />, "I'm a link!"],
} as NavLinkProps;
