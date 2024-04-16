import { ReactNode } from "react";
import { useAuth } from "../../../../contexts/AuthenticationContext/AuthenticationContext";
import StackedLayout from "../StackedLayout/StackedLayout";
import CardLayout from "../CardLayout/CardLayout";

interface IAutomaticLayoutProps {
  children?: ReactNode;
  title?: string;
}

const AutomaticLayout = ({ children, title }: IAutomaticLayoutProps) => {
  const { user } = useAuth();

  if (user) {
    return <StackedLayout title={title}>{children}</StackedLayout>;
  }

  return <CardLayout title={title}>{children}</CardLayout>;
};

export default AutomaticLayout;
