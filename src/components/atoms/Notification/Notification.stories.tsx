import { Meta, Story } from "@storybook/react";
import Notification, { NotificationProps } from "./Notification";

export default {
  title: "Atoms/Notification",
  component: Notification,
  argTypes: {
    message: {
      type: "string",
    },
  },
} as Meta;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  message: "Message",
};

export const Info = Template.bind({});
Info.args = {
  ...Default.args,
  severity: "info",
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  severity: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  ...Default.args,
  severity: "warning",
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  severity: "error",
};

export const WithCloseHandler = Template.bind({});
WithCloseHandler.args = {
  ...Info.args,
  handleClose: () => {},
};
