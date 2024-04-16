import Image from "next/image";
import { ArrowsExpandIcon, CashIcon, HomeIcon } from "@heroicons/react/outline";
import { ReactNode, useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { LinkIcon } from "@heroicons/react/solid";
import { RealEstate } from "../../../definitions/types/models/RealEstate";
import Panel from "../../atoms/Panel/Panel";
import FileUtility from "../../../utilities/FileUtility";
import Avatar from "../../atoms/Avatar/Avatar";
import { PLACEHOLDER_IMAGE } from "../../../config/constants/placeholders";
import Link from "../../atoms/Link/Link";

interface Props {
  loading?: boolean;
  realEstate?: RealEstate;
  callToAction?: ReactNode;
}

const RealEstateDetailPanel = ({
  loading,
  realEstate,
  callToAction,
}: Props) => {
  const { t } = useTranslation();

  const details = useMemo(() => {
    if (!realEstate) return [];
    return [
      {
        label: t("realEstates:fields.rooms"),
        value: realEstate.rooms,
        icon: HomeIcon,
      },
      {
        label: t("realEstates:fields.space"),
        value: `${realEstate.space} m²`,
        icon: ArrowsExpandIcon,
      },
      {
        label: t("realEstates:fields.grossRent"),
        value: `${realEstate.grossRent} CHF`,
        icon: CashIcon,
      },
      {
        label: t("realEstates:fields.netRent"),
        value: `${realEstate.netRent} CHF`,
        icon: CashIcon,
      },
    ];
  }, [realEstate, t]);

  return (
    <Panel noPadding loading={loading}>
      {realEstate && (
        <div className="grid md:grid-cols-2 gap-5 p-6">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-md"
              objectFit="cover"
              src={
                realEstate.realEstateImage
                  ? FileUtility.getImageURL(realEstate.realEstateImage.name)
                  : PLACEHOLDER_IMAGE
              }
              width={600}
              height={450}
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center md:mx-auto">
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="block font-bold text-4xl">
                  {realEstate.name}
                </span>
                <span className="block italic text-gray-600">
                  {realEstate.address.street}, {realEstate.address.postCode}{" "}
                  {realEstate.address.city}, {realEstate.address.country}
                </span>
                {realEstate.realEstateReferenceLink && (
                  <Link
                    className="my-2 text-primary-600"
                    href={realEstate.realEstateReferenceLink}
                    external
                    openNewTab
                  >
                    <div className="inline-flex items-baseline space-x-1">
                      <LinkIcon height=".7em" />
                      <span> {t("realEstates:text.referenceLink")} </span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="my-auto px-4">
                <dl className="grid gap-4 md:gap-8 md:grid-cols-2">
                  {details.map((detail) => (
                    <div
                      key={detail.label}
                      className="relative bg-white overflow-hidden"
                    >
                      <dt>
                        <div className="absolute bg-primary-100 rounded-md p-3">
                          <detail.icon
                            className="h-6 w-6 text-primary-500"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                          {detail.label}
                        </p>
                      </dt>
                      <dd className="ml-16 flex items-baseline">
                        <p className="text-lg md:text-2xl font-semibold text-gray-900">
                          {detail.value}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex flex-col flex-wrap space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between md:items-center mt-4">
              <div>
                <span className="inline-block italic text-gray-700 mb-2">
                  {t("realEstates:text.agent")}
                </span>
                <div className="ml-4 flex items-center space-x-5">
                  <Avatar
                    unoptimized
                    size="sm"
                    src={
                      realEstate.agent.avatar
                        ? FileUtility.getImageURL(realEstate.agent.avatar.name)
                        : undefined
                    }
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {realEstate.agent.firstName} {realEstate.agent.lastName}
                    </span>
                    {realEstate.agent.company && (
                      <span className="text-sm italic text-gray-700">
                        {t("realEstates:text.representsCompany", {
                          company: realEstate.agent.company.companyName,
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {callToAction}
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
};

export default RealEstateDetailPanel;
