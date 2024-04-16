import { ReactNode } from "react";
import clsx from "clsx";

export interface DescriptionListItem {
  title: string;
  content?: ReactNode;
}

interface DescriptionListProps {
  title?: string;
  description?: string;
  items: DescriptionListItem[];
}

const DescriptionList = ({
  items,
  title,
  description,
}: DescriptionListProps) => (
  <div>
    {(title || description) && (
      <div className="px-4 py-5 sm:px-6">
        {title && (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        )}
      </div>
    )}
    <div className="border-t border-gray-200">
      <dl>
        {items.map((item, index) => (
          <div
            className={clsx(
              index % 2 === 0 ? "bg-gray-50" : "bg-white",
              "px-4 py-5 sm:px-6",
              "sm:grid sm:grid-cols-5 sm:gap-4"
            )}
            key={item.title}
          >
            <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
              {item.title}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
              {item.content}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

export default DescriptionList;
