import { Meta, Story } from "@storybook/react";
import Link, { LinkProps } from "./Link";

export default {
  title: "Atoms/Link",
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "/",
  children: "Link",
};

export const TextLink = Template.bind({});
TextLink.args = {
  ...Default.args,
  variant: "text",
};

export const RegularLink = Template.bind({});
RegularLink.args = {
  ...Default.args,
  variant: "link",
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  ...Default.args,
  external: true,
  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  openNewTab: true,
};
