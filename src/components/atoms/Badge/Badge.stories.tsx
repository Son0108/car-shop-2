import { Meta, Story } from "@storybook/react";
import Badge, { BadgeProps } from "./Badge";

export default {
  title: "Atoms/Badge",
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Badge",
  color: "gray",
  size: "regular",
};

export const PrimaryBadge = Template.bind({});
PrimaryBadge.args = {
  children: "Badge",
  color: "primary",
  size: "regular",
};

export const InfoBadge = Template.bind({});
InfoBadge.args = {
  children: "Badge",
  color: "info",
  size: "regular",
};

export const SuccessBadge = Template.bind({});
SuccessBadge.args = {
  children: "Badge",
  color: "success",
  size: "regular",
};

export const WarningBadge = Template.bind({});
WarningBadge.args = {
  children: "Badge",
  color: "warning",
  size: "regular",
};

export const ErrorBadge = Template.bind({});
ErrorBadge.args = {
  children: "Badge",
  color: "error",
  size: "regular",
};
