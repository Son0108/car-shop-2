import { createContext, ReactNode, useContext, useState } from "react";
import { v4 } from "uuid";
import useMedia from "../../hooks/useMedia";
import NotificationStack from "../../components/molecules/NotificationStack/NotificationStack";
import { INotification } from "../../definitions/types/INotification";

export type NotificationOption = Omit<INotification, "id">;
export type NotifyFunction = (options: NotificationOption) => string;

export interface INotificationContextValues {
  notifications: INotification[];
  notify: NotifyFunction;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<INotificationContextValues>(
  {} as INotificationContextValues
);

export const useNotifier = () => useContext(NotificationContext);

export interface INotificationManagerProps {
  children?: ReactNode;
}

/**
 * The NotificationCTXProvider acts as a context-provider for the notification context.
 * Also it renders the notifications of the context inside the notification stack.
 * @param children react-elements which are rendered as children of the context-provider.
 */
const NotificationCTXProvider = ({ children }: INotificationManagerProps) => {
  const isDesktop = useMedia("sm");
  const [notifications, setNotifications] = useState<INotification[]>([]);

  /**
   * Add a notification to be displayed to the user.
   */
  const addNotification = (option: NotificationOption): string => {
    const id = v4().toString();
    const newNotification: INotification = {
      id,
      ...option,
    };
    setNotifications((prev) => [...prev, newNotification]);
    return id;
  };

  /**
   * Remove the notification with the given id form the queue.
   * @param id of the notification
   */
  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify: addNotification,
        removeNotification,
      }}
    >
      {children}
      <NotificationStack
        maxNotifications={isDesktop ? 4 : 2}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </NotificationContext.Provider>
  );
};
export default NotificationCTXProvider;
