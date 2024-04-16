import { Severity } from "./Severity";

export interface INotificationAction {
  text: string;
  onClick?: () => void;
}

export interface INotification {
  id: string;
  message?: string;
  severity: Severity;
  title: string;
  actions?: INotificationAction[];
}
