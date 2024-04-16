import { Meta, Story } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Test</Button>;

export const ContainedButton = Template.bind({});
ContainedButton.args = {
  variant: "contained",
};

export const TextButton = Template.bind({});
TextButton.args = {
  variant: "text",
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  disabled: true,
};

export const ExtraSmallButton = Template.bind({});
ExtraSmallButton.args = {
  size: "xs",
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  size: "sm",
};

export const MediumButton = Template.bind({});
MediumButton.args = {
  size: "md",
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  size: "lg",
};

export const ExtraLargeButton = Template.bind({});
ExtraLargeButton.args = {
  size: "lg",
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  color: "primary",
};

export const AccentButton = Template.bind({});
AccentButton.args = {
  color: "accent",
};

export const WhiteButton = Template.bind({});
WhiteButton.args = {
  color: "white",
};

export const BlackButton = Template.bind({});
BlackButton.args = {
  color: "black",
};

export const InfoButton = Template.bind({});
InfoButton.args = {
  color: "info",
};

export const SuccessButton = Template.bind({});
SuccessButton.args = {
  color: "success",
};

export const WarningButton = Template.bind({});
WarningButton.args = {
  color: "warning",
};

export const ErrorButton = Template.bind({});
ErrorButton.args = {
  color: "error",
};
