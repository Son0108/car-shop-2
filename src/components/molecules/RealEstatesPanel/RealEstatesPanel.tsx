import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";
import { RealEstate } from "../../../definitions/types/models/RealEstate";
import FileUtility from "../../../utilities/FileUtility";
import { PLACEHOLDER_IMAGE } from "../../../config/constants/placeholders";
import DataPanel from "../DataPanel/DataPanel";
import Link from "../../atoms/Link/Link";
import { sortByRealEstateStatus } from "../../../helpers/status/StatusCompareFunctions";
import { PaginationProps } from "../PaginationPanel/PaginationPanel";

export interface IRealEstatesPanelProps {
  realEstates?: RealEstate[];
  loading?: boolean;
  pagination?: PaginationProps;
}

const RealEstatesPanel = ({
  realEstates,
  loading,
  pagination,
}: IRealEstatesPanelProps) => {
  const { t } = useTranslation();

  return (
    <DataPanel
      pagination={pagination}
      title={t("realEstates:text.realEstates")}
      addAction={
        <Link
          variant="text"
          className="text-sm text-gray-700"
          href="/real-estates/new"
        >
          {t("realEstates:actions.new")}
        </Link>
      }
      keyFunc={(item: RealEstate) => item.id}
      data={realEstates?.sort((realEstate1, realEstate2) =>
        sortByRealEstateStatus(
          realEstate1.status.value,
          realEstate2.status.value
        )
      )}
      loading={loading}
    >
      {(item: RealEstate) => (
        <div className="flex flex-row items-center">
          <NextLink href={`/real-estates/${item.id}`}>
            <a
              className={clsx(
                "px-6 py-3 flex flex-grow",
                "sm:flex-row sm:justify-even sm:items-center sm:space-x-4",
                "hover:bg-gray-50"
              )}
            >
              <div>
                <div className="relative h-12 w-12 rounded-full">
                  <Image
                    width={100}
                    height={100}
                    className="absolute h-full w-full object-cover rounded-full"
                    src={
                      item.realEstateImage
                        ? FileUtility.getImageURL(item.realEstateImage.name)
                        : PLACEHOLDER_IMAGE
                    }
                    unoptimized
                  />
                  <span
                    className={clsx(
                      "absolute right-0 bottom-0 rounded-full h-4 w-4 block",
                      item.status.value === "OPEN" && "bg-success-500",
                      item.status.value === "ON_HOLD" && "bg-warning-500",
                      item.status.value === "CLOSED" && "bg-error-500"
                    )}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold">{item.name}</h4>
              </div>
              <div className="flex flex-col sm:items-end">
                <p className="text-gray-700 font-semibold">
                  {`${item.address.street}, ${item.address.postCode} ${item.address.city}`}
                </p>
                <p className="text-gray-600">
                  {t("realEstates:text.realEstateInfo", {
                    rooms: item.rooms,
                    rent: item.grossRent,
                    space: item.space,
                  })}
                </p>
              </div>
            </a>
          </NextLink>

          <a>
            {item.published ? (
              <LockOpenIcon
                key={`lock-open-${item.id}`}
                className={clsx(
                  "text-success-500",
                  "h-6 w-6 flex-shrink-0 mr-5"
                )}
                aria-hidden="true"
              />
            ) : (
              <LockClosedIcon
                key={`lock-closed-${item.id}`}
                className={clsx("text-error-500", "h-6 w-6 flex-shrink-0 mr-5")}
                aria-hidden="true"
              />
            )}
          </a>
        </div>
      )}
    </DataPanel>
  );
};

export default RealEstatesPanel;
