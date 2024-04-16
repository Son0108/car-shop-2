import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { ApplicationWithUser } from "../../../definitions/types/models/Application";
import Panel from "../../atoms/Panel/Panel";
import DescriptionList, {
  DescriptionListItem,
} from "../../molecules/DescriptionList/DescriptionList";
import FileList from "../../molecules/FileList/FileList";
import { getPhoneNumberString } from "../../../utilities/PhoneNumberUtility";
import { IFile } from "../../../definitions/types/models/File";
import Avatar from "../../atoms/Avatar/Avatar";
import FileUtility from "../../../utilities/FileUtility";
import Heading from "../../atoms/Heading/Heading";

interface ApplicantPanelProps {
  application?: ApplicationWithUser;
  handleDownload: { (file: IFile): Promise<void> };
  loading?: boolean;
}

const ApplicantPanel = ({
  application,
  handleDownload,
  loading,
}: ApplicantPanelProps) => {
  const { t } = useTranslation();

  const descriptionItems: DescriptionListItem[] = useMemo(() => {
    if (!application || !application.applicant) return [];
    const { applicant } = application;

    const items: DescriptionListItem[] = [];

    if (applicant.avatar) {
      items.push({
        title: t("forms:fields.avatar"),
        content: (
          <div className="inline-flex w-full justify-center md:justify-start">
            <Avatar
              size="lg"
              src={FileUtility.getImageURL(applicant.avatar.name)}
              unoptimized
            />
          </div>
        ),
      });
    }

    items.push(
      ...[
        {
          title: t("forms:fields.fullName"),
          content: (
            <p>
              {applicant.firstName} {applicant.lastName}
            </p>
          ),
        },
        {
          title: t("forms:fields.email"),
          content: <p>{applicant.email}</p>,
        },
      ]
    );

    if (applicant.phoneNumber) {
      items.push({
        title: t("forms:fields.phoneNumber"),
        content: <p>{getPhoneNumberString(applicant.phoneNumber)}</p>,
      });
    }

    if (applicant.address) {
      items.push({
        title: t("forms:fields.address"),
        content: (
          <p>
            {applicant.address?.street}
            <br />
            {applicant.address?.postCode} {applicant.address?.city}
            <br />
            {applicant.address?.country}
          </p>
        ),
      });
    }

    items.push({
      title: t("forms:fields.documents"),
      content:
        applicant.files && applicant.files.length > 0 ? (
          <FileList
            files={applicant.files.map((file) => ({
              name: file.fileCategory.text,
              handleDownload: () => handleDownload(file),
            }))}
          />
        ) : (
          <p>{t("applications:text.noDocuments")}</p>
        ),
    });

    return items;
  }, [application, handleDownload, t]);

  return (
    <Panel
      header={
        <Heading variant="h4" as="h2">
          {t("applications:headings.general")}
        </Heading>
      }
      loading={loading}
      noPadding
    >
      {application && <DescriptionList items={descriptionItems} />}
    </Panel>
  );
};

export default ApplicantPanel;
