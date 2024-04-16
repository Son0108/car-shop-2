import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Props definition of the Panel component
 */
export interface PanelProps {
  /**
   * main content of the panel
   */
  children?: ReactNode;
  /**
   * content of the panel footer
   */
  footer?: ReactNode;
  /**
   * content of the panel heading
   */
  header?: ReactNode;
  /**
   * remove padding from the panel-content
   */
  noPadding?: boolean;
  /**
   * loading state of the panel
   */
  loading?: boolean;
  /**
   * define if a panel should fill the available height
   */
  fill?: boolean;
}

/**
 * Panel component based on the TailwindUI component
 */
const Panel = ({
  children,
  footer,
  header,
  noPadding,
  fill = true,
  loading,
}: PanelProps) => (
  <div
    className={clsx(
      "bg-white shadow rounded-lg divide-y divide-gray-200 w-full flex flex-col overflow-hidden",
      fill && "h-full"
    )}
  >
    {header && <div className="px-4 py-5 sm:px-6">{header}</div>}
    <div className={clsx("h-auto flex-grow", !noPadding && "px-4 py-5 sm:p-6")}>
      {loading && (
        <div className="flex justify-center items-center my-12">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      {!loading && children}
    </div>
    {footer && <div className="px-4 py-4 sm:px-6">{footer}</div>}
  </div>
);

export default Panel;
