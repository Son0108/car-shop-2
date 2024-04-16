import { ReactNode } from "react";

interface DetailsListProps<T extends Record<string, unknown>> {
  data: T;
  title: string;
  details: {
    key: string;
    label: string;
    render?: (data: T) => ReactNode;
  }[];
}

function DetailsList<T extends Record<string, unknown>>({
  data,
  details,
  title,
}: DetailsListProps<T>) {
  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {details.map(({ key, label, render }) => (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {render ? render(data) : (data[key] as string)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default DetailsList;
