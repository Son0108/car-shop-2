import { Meta, Story } from "@storybook/react";
import Heading, { HeadingProps } from "./Heading";

export default {
  title: "Atoms/Heading",
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Heading",
  variant: "h1",
};

export const Heading1 = Template.bind({});
Heading1.args = {
  ...Default.args,
  variant: "h1",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  ...Default.args,
  variant: "h2",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  ...Default.args,
  variant: "h3",
};

export const Heading4 = Template.bind({});
Heading4.args = {
  ...Default.args,
  variant: "h4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  ...Default.args,
  variant: "h5",
};

export const Heading6 = Template.bind({});
Heading6.args = {
  ...Default.args,
  variant: "h6",
};
