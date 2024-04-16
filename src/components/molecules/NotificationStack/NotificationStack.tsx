import { animated, useTransition } from "react-spring";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import clsx from "clsx";
import Notification from "../../atoms/Notification/Notification";
import useMedia from "../../../hooks/useMedia";
import { INotification } from "../../../definitions/types/INotification";

export interface INotificationStack {
  /**
   * duration for which the notifications are shown
   */
  duration?: number;
  /**
   * maximum amount of simultaneously shown notifications
   */
  maxNotifications?: number;
  /**
   * shown notifications
   */
  notifications: INotification[];
  /**
   * setter for the notifications
   */
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
}

/**
 * Show multiple notifications in a stack.
 */
const NotificationStack = ({
  duration = 3000,
  maxNotifications,
  notifications,
  setNotifications,
}: INotificationStack) => {
  const isDesktop = useMedia("sm");
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const transitions = useTransition(notifications, {
    keys: (i) => i.id,
    from: { opacity: 0, height: 0, life: "100%" },
    enter: (item) => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ opacity: 1, height: "auto" });
      await next({ life: "0%" });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, item) => {
      setNotifications((state) => state.filter((i) => i.id !== item.id));
    },
    config: (_item, _index, phase) => (key) =>
      phase === "enter" && key === "life"
        ? { duration }
        : { tension: 125, friction: 20, precision: 0.1 },
  });

  useEffect(() => {
    if (maxNotifications && maxNotifications <= 1) {
      throw new Error(`prop "maxNotifications" must be set to 1 or more`);
    }
    // If more notifications are shown than allowed by the maxNotifications prop
    // cancel the oldest notification
    if (maxNotifications && notifications.length > maxNotifications) {
      const notification = notifications[0];
      if (notification && cancelMap.get(notification)) {
        cancelMap.get(notification)();
        setNotifications((state) =>
          state.filter((i) => i.id !== notification.id)
        );
      }
    }
  }, [cancelMap, maxNotifications, notifications, setNotifications]);

  return (
    <div
      className={clsx(
        "fixed z-notifications",
        isDesktop && "right-6 bottom-6",
        !isDesktop && "inset-x-4 bottom-4"
      )}
    >
      <div className="flex flex-col space-y-2 sm:space-y-4 items-center sm:items-end w-full max-w-full sm:w-60ch">
        {transitions((props, item) => (
          <animated.div
            className="w-full"
            key={item.id}
            ref={(ref) => ref && refMap.set(item, ref)}
            style={props}
          >
            <Notification
              title={item.title}
              message={item.message}
              severity={item.severity}
              handleClose={(e) => {
                e.stopPropagation();
                if (cancelMap.has(item)) cancelMap.get(item)();
              }}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationStack;
