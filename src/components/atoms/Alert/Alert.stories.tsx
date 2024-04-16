import { Meta, Story } from "@storybook/react";
import Alert, { AlertProps } from "./Alert";

export default {
  title: "Atoms/Alert",
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  children: <p>Detailed alert message</p>,
};

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  ...Default.args,
  severity: "info",
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  ...Default.args,
  severity: "success",
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  ...Default.args,
  severity: "warning",
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  ...Default.args,
  severity: "error",
};

export const WithCloseAction = Template.bind({});
WithCloseAction.args = {
  ...Default.args,
  handleClose: () => {},
};

export const WithActions = Template.bind({});
WithActions.args = {
  ...Default.args,
  actions: [
    {
      text: "Action 1",
    },
    {
      text: "Action 2",
    },
  ],
};
