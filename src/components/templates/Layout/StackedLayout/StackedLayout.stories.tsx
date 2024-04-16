import { Meta, Story } from "@storybook/react";
import StackedLayout, { StackedLayoutProps } from "./StackedLayout";
import Panel from "../../../atoms/Panel/Panel";

export default {
  title: "Templates/Layout/StackedLayout",
  component: StackedLayout,
} as Meta;

const Template: Story<StackedLayoutProps> = (args) => (
  <StackedLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Example",
  children: (
    <Panel>
      <p>Hello world</p>
    </Panel>
  ),
};
