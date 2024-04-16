import { Meta, Story } from "@storybook/react";
import Stepper, { StepperProps } from "./Stepper";
import Panel from "../Panel/Panel";

export default {
  title: "Atoms/Stepper",
  component: Stepper,
} as Meta;

const Template: Story<StepperProps> = (args) => (
  <Panel>
    <Stepper {...args} />
  </Panel>
);

export const Default = Template.bind({});
Default.args = {
  steps: 3,
  current: 1,
};
