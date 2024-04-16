import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import Heading from "../../../../atoms/Heading/Heading";
import EditableFileList from "../../../../molecules/FileList/EditableFileList";
import {
  FileCategory,
  IFile,
} from "../../../../../definitions/types/models/File";
import { downloadFile } from "../../../../../helpers/DownloadHelper";
import { isAPIError } from "../../../../../config/api/api-error";
import { handleAPIErrorResponse } from "../../../../../helpers/errors/APIErrorHandler";
import { FileUploadFormValues } from "../../../shared/FileUploadFormModal";
import UserService from "../../../../../services/UserService";
import { useNotifier } from "../../../../../contexts/NotificationContext/NotificationContext";
import { useAuth } from "../../../../../contexts/AuthenticationContext/AuthenticationContext";

const DocumentsTab = () => {
  const { t } = useTranslation();
  const { notify } = useNotifier();
  const { user, mutate: mutateUser } = useAuth();

  const { data: fileCategories, error: fileCategoriesError } = useSWR<
    FileCategory[]
  >("/file-categories/user-files");

  const handleDownload = (file: IFile) => downloadFile(file, notify);

  const handleUpload = async (values: FileUploadFormValues) => {
    try {
      if (values.file) {
        await UserService().uploadDocument(values.fileCategory, values.file);

        // Force revalidation of user to show updated files
        await mutateUser(user, true);
      }
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  const handleDeletion = async (file: IFile) => {
    try {
      await UserService().deleteDocument(file.name);

      // Force revalidation of user to show updated files
      await mutateUser(user, true);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  return (
    <div>
      <Heading variant="h4" as="h2">
        {t("profile:heading.documents")}
      </Heading>
      {fileCategories && !fileCategoriesError && (
        <div className="my-4">
          <EditableFileList
            handleUpload={handleUpload}
            handleDelete={handleDeletion}
            handleDownload={handleDownload}
            items={fileCategories.map((fileCategory) => {
              return {
                fileCategory,
                value: user?.files.find(
                  (userFile) =>
                    userFile.fileCategory.value === fileCategory.value
                ),
              };
            })}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;
