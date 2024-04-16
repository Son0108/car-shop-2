import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Application } from "../../../definitions/types/models/Application";
import FileUtility from "../../../utilities/FileUtility";
import Badge from "../../atoms/Badge/Badge";
import DataPanel from "../DataPanel/DataPanel";
import { PLACEHOLDER_IMAGE } from "../../../config/constants/placeholders";
import { getBadgeColorForApplicationStatus } from "../../../helpers/status/BadgeColorHelper";
import { PaginationProps } from "../PaginationPanel/PaginationPanel";

interface ApplicationsOverviewPanelProps {
  applications?: Application[];
  loading?: boolean;
  pagination?: PaginationProps;
}

const ApplicationsOverviewPanel = ({
  applications,
  loading,
  pagination,
}: ApplicationsOverviewPanelProps) => {
  const { t } = useTranslation();

  return (
    <DataPanel
      pagination={pagination}
      data={applications?.filter(
        (application) => application.realEstate.published
      )}
      keyFunc={(item: Application) => `application-${item.realEstate.id}`}
      loading={loading}
      title={t("dashboard:tenant.applications")}
    >
      {({ realEstate, status }: Application) => (
        <Link href={`/real-estates/${realEstate.id}`}>
          <a
            className={clsx(
              "px-6 py-3 flex flex-col",
              "sm:flex-row sm:justify-even sm:items-center sm:space-x-4"
            )}
          >
            <div>
              <div className="relative h-12 w-12 rounded-full">
                <Image
                  width={100}
                  height={100}
                  unoptimized
                  className="absolute h-full w-full object-cover rounded-full"
                  src={
                    realEstate.realEstateImage
                      ? FileUtility.getImageURL(realEstate.realEstateImage.name)
                      : PLACEHOLDER_IMAGE
                  }
                />
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="text-lg font-bold">{realEstate.name}</h4>
              <span className="text-base text-gray-700">
                {`${realEstate.address.street}, ${realEstate.address.postCode} ${realEstate.address.city}`}
              </span>
            </div>
            <div className="flex flex-col sm:items-end">
              <Badge color={getBadgeColorForApplicationStatus(status.value)}>
                {status.text}
              </Badge>
              <p className="text-gray-600">
                {t("realEstates:text.realEstateInfo", {
                  rooms: realEstate.rooms,
                  rent: realEstate.grossRent,
                  space: realEstate.space,
                })}
              </p>
            </div>
            {
              // Chevron to navigate to application detail view
            }
          </a>
        </Link>
      )}
    </DataPanel>
  );
};

export default ApplicationsOverviewPanel;
