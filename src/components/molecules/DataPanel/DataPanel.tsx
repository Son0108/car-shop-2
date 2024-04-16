import { ReactNode } from "react";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import Panel from "../../atoms/Panel/Panel";
import Heading from "../../atoms/Heading/Heading";
import PaginationPanel, {
  PaginationProps,
} from "../PaginationPanel/PaginationPanel";

/**
 * Props definition for the DataPanel component.
 */
export interface DataPanelProps<T> {
  /**
   * action to add a new item
   */
  addAction?: ReactNode;
  /**
   * Render function that is run for each item provided via the data prop.
   */
  children: (item: T) => ReactNode;
  /**
   * Data tuple that should be rendered inside the panel.
   */
  data?: T[];
  /**
   * Function that returns an unique key for each item.
   */
  keyFunc: (item: T) => string;
  /**
   * Loading state of the data-panel
   */
  loading?: boolean;
  /**
   * define if a gray line should be shown between the items.
   * Default to true
   */
  dividers?: boolean;
  /**
   * Title rendered in the panel-header
   */
  title: string;

  /**
   * Properties for pagination
   */
  pagination?: PaginationProps;
}

/**
 * The DataPanel component renders a tuple of data inside a Panel component.
 * The component also handles a loading state as well
 * as a message if no data was given.
 */
function DataPanel<T>({
  pagination,
  addAction,
  children,
  dividers = true,
  keyFunc,
  data,
  loading,
  title,
}: DataPanelProps<T>) {
  const { t } = useTranslation();

  return (
    <Panel
      header={
        <div className="flex justify-between items-center">
          <Heading variant="h4" as="h2">
            {title}
          </Heading>
          {addAction}
        </div>
      }
      loading={loading}
      noPadding
    >
      {data && data.length > 0 ? (
        <>
          <ul className={clsx(dividers && "divide-y divide-gray-200")}>
            {data.map((item) => (
              <li key={keyFunc(item)} className="">
                {children(item)}
              </li>
            ))}
          </ul>
          <PaginationPanel
            page={pagination && pagination.page ? pagination.page : 0}
            size={pagination && pagination.size ? pagination.size : 5}
            totalCount={
              pagination && pagination.totalCount ? pagination.totalCount : 0
            }
            setPagination={pagination?.setPagination}
            showAll={pagination?.showAll}
          />
        </>
      ) : (
        <p className="text-center my-8">{t("common:text.noData")}</p>
      )}
    </Panel>
  );
}

export default DataPanel;
