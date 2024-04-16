import { Meta, Story } from "@storybook/react";
import { UserIcon } from "@heroicons/react/solid";
import VerticalNavigation, {
  VerticalNavigationProps,
} from "./VerticalNavigation";

export default {
  title: "Atoms/VerticalNavigation",
  component: VerticalNavigation,
} as Meta;

const Template: Story<VerticalNavigationProps> = (args) => (
  <VerticalNavigation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      href: "/",
      text: "Link 1",
      icon: UserIcon,
    },
    {
      href: "#",
      text: "Link 2",
      icon: UserIcon,
    },
    {
      href: "#",
      text: "Link 3",
      icon: UserIcon,
    },
  ],
};
