import { Meta, Story } from "@storybook/react";
import DataPanel, { DataPanelProps } from "./DataPanel";

export default {
  title: "Molecules/DataPanel",
  component: DataPanel,
} as Meta;

const Template: Story<DataPanelProps<string>> = (args) => (
  // eslint-disable-next-line react/destructuring-assignment
  <DataPanel {...args}>{args.children}</DataPanel>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  keyFunc: (item: string) => item,
  data: ["Item 1", "Item 2", "Item 3"],
  children: (item: string) => <p>{item}</p>,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  ...Default.args,
  data: [],
};
