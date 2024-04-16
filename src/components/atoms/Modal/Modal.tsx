import { Fragment, ReactNode, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { Severity } from "../../../definitions/types/Severity";

interface ModalProps {
  content?: ReactNode;
  closeCallback?: { (): void };
  dismissible?: boolean;
  severity?: Severity;
  title: string;
  actions: ReactNode;
}

const Modal = ({
  content,
  closeCallback,
  dismissible = true,
  severity,
  title,
  actions,
}: ModalProps) => {
  const [open, setOpen] = useState(true);

  const icon = useMemo(() => {
    switch (severity) {
      case "success":
        return <CheckIcon className="text-success-500" />;
      case "info":
        return <InformationCircleIcon className="text-info-500" />;
      case "warning":
        return <ExclamationIcon className="text-warning-500" />;
      case "error":
        return <XIcon className="text-error-500" />;
      default:
        return null;
    }
  }, [severity]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-backdrop inset-0 min-h-screen overflow-y-auto"
        open={open}
        onClose={(value: boolean) => {
          setOpen(value);
          if (closeCallback) {
            closeCallback();
          }
        }}
        onAbort={() => {
          if (closeCallback) closeCallback();
        }}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {dismissible ? (
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            ) : (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            )}
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative z-modal inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-lg sm:w-full sm:p-6">
              <div>
                {icon && (
                  <div
                    className={clsx(
                      "mx-auto flex items-center justify-center h-12 w-12 rounded-full",
                      severity === "info" && "bg-info-100",
                      severity === "success" && "bg-success-100",
                      severity === "warning" && "bg-warning-100",
                      severity === "error" && "bg-error-100"
                    )}
                  >
                    <div className="h-6 w-6">{icon}</div>
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{content}</div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {actions}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
