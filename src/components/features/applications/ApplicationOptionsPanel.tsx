import { useMemo, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import {
  ApplicationStatus,
  ApplicationWithUser,
} from "../../../definitions/types/models/Application";
import Button from "../../atoms/Button/Button";
import Panel from "../../atoms/Panel/Panel";
import Alert from "../../atoms/Alert/Alert";
import FileUtility from "../../../utilities/FileUtility";
import { PLACEHOLDER_IMAGE } from "../../../config/constants/placeholders";
import Heading from "../../atoms/Heading/Heading";
import Link from "../../atoms/Link/Link";

interface ApplicationOptionsPanelProps {
  application?: ApplicationWithUser;
  loading?: boolean;
  handleUpdate: { (status: ApplicationStatus): Promise<void> };
}

const ApplicationOptionsPanel = ({
  application,
  loading,
  handleUpdate,
}: ApplicationOptionsPanelProps) => {
  const { t } = useTranslation();
  const [loadingPrimaryAction, setLoadingPrimaryAction] = useState(false);
  const [loadingSecondaryAction, setLoadingSecondaryAction] = useState(false);

  const info = useMemo(() => {
    if (!application) return null;

    if (application.status.value === "ACCEPTED") {
      return (
        <Alert severity="success">
          <p>{t("applications:text.thisApplicationAccepted")}</p>
        </Alert>
      );
    }

    if (application.status.value === "DECLINED") {
      return (
        <Alert severity="error">
          <p>{t("applications:text.thisApplicationDeclined")}</p>
        </Alert>
      );
    }

    if (application.status.value === "TEMPORARY_ACCEPTED") {
      return (
        <Alert severity="success">
          <p>{t("applications:text.thisApplicationTemporaryAccepted")}</p>
        </Alert>
      );
    }

    if (application.status.value === "ON_HOLD") {
      return (
        <Alert severity="info">
          <p>{t("applications:text.otherApplicationTemporaryAccepted")}</p>
        </Alert>
      );
    }

    return null;
  }, [application, t]);

  const handlePrimaryAction = async () => {
    if (!application) return;
    switch (application.status.value) {
      case "TEMPORARY_ACCEPTED":
        await handleUpdate("ACCEPTED");
        break;
      case "OPEN":
        await handleUpdate("TEMPORARY_ACCEPTED");
        break;
      default:
        break;
    }
  };

  return (
    <Panel loading={loading} fill={false}>
      {application && (
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="w-full flex justify-center">
              <Image
                className="rounded-md"
                width={500}
                height={375}
                objectFit="cover"
                src={
                  application.realEstate.realEstateImage
                    ? FileUtility.getImageURL(
                        application.realEstate.realEstateImage.name
                      )
                    : PLACEHOLDER_IMAGE
                }
                unoptimized
              />
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <Heading variant="h4" as="h2">
                {t("applications:text.realEstateName", {
                  name: application.realEstate.name,
                })}
              </Heading>
              <Link
                href={`/real-estates/${application.realEstate.id}`}
                variant="link"
              >
                &larr; {t("applications:text.navigateToRealEstate")}
              </Link>
            </div>
          </div>
          {info && <div className="flex w-full">{info}</div>}
          <div className="flex flex-wrap space-x-4">
            <Button
              onClick={async () => {
                setLoadingPrimaryAction(true);
                await handlePrimaryAction();
                setLoadingPrimaryAction(false);
              }}
              loading={loadingPrimaryAction}
              disabled={
                loadingSecondaryAction ||
                application.realEstate.status.value === "CLOSED" ||
                application.status.value === "DECLINED" ||
                application.status.value === "ON_HOLD" ||
                application.status.value === "ACCEPTED"
              }
            >
              {application &&
              (application.status.value === "TEMPORARY_ACCEPTED" ||
                application.status.value === "ACCEPTED")
                ? t("applications:actions.accept")
                : t("applications:actions.acceptTemporary")}
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={async () => {
                setLoadingSecondaryAction(true);
                await handleUpdate("DECLINED");
                setLoadingSecondaryAction(false);
              }}
              loading={loadingSecondaryAction}
              disabled={
                loadingPrimaryAction ||
                application.realEstate.status.value === "CLOSED" ||
                application.status.value === "ACCEPTED" ||
                application.status.value === "DECLINED"
              }
            >
              {t("applications:actions.decline")}
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
};

export default ApplicationOptionsPanel;
