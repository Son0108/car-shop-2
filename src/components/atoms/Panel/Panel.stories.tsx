import { Meta, Story } from "@storybook/react";
import Panel, { PanelProps } from "./Panel";
import Heading from "../Heading/Heading";

export default {
  title: "Atoms/Panel",
  component: Panel,
  argTypes: {
    header: {
      control: {
        type: "text",
      },
    },
    footer: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Template: Story<PanelProps> = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Content",
};

export const WithHeaderAndFooter = Template.bind({});
WithHeaderAndFooter.args = {
  ...Default.args,
  header: <Heading variant="h3">Heading</Heading>,
  footer: <p>Footer</p>,
};
