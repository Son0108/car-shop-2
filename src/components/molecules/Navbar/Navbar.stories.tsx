import { Meta, Story } from "@storybook/react";
import Navbar, { NavbarProps } from "./Navbar";

export default {
  title: "Molecules/Navbar",
  component: Navbar,
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Example",
  items: [
    {
      text: "Home",
      href: "/",
    },
  ],
};
