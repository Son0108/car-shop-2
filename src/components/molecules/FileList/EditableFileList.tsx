import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { FileListItem, FileListWrapper } from "./FileList";
import { FileCategory, IFile } from "../../../definitions/types/models/File";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";
import Button from "../../atoms/Button/Button";
import FileUploadFormModal, {
  FileUploadFormValues,
} from "../../features/shared/FileUploadFormModal";

interface FileItem {
  fileCategory: FileCategory;
  value?: IFile;
}

const EditableFileListItem = ({
  fileCategory,
  value,
  handleDelete,
  handleDownload,
  handleUpload,
}: FileItem & Omit<EditableFileListProps, "items">) => {
  const { t } = useTranslation();
  const [renderForm, setRenderForm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <FileListItem
        key={fileCategory.value}
        name={fileCategory.text}
        actions={
          value ? (
            <div>
              <Button
                variant="text"
                size="sm"
                color="primary"
                onClick={() => (value ? handleDownload(value) : {})}
              >
                {t("forms:actions.download")}
              </Button>
              <span className="mx-2 text-gray-300">|</span>
              <Button
                variant="text"
                size="sm"
                color="primary"
                loading={deleting}
                onClick={async () => {
                  if (value) {
                    setDeleting(true);
                    await handleDelete(value);
                    setDeleting(false);
                  }
                }}
              >
                {t("forms:actions.delete")}
              </Button>
            </div>
          ) : (
            <Button
              variant="text"
              size="sm"
              color="primary"
              onClick={() => setRenderForm(true)}
            >
              {t("forms:actions.upload")}
            </Button>
          )
        }
      />
      {renderForm && (
        <FileUploadFormModal
          fileCategory={fileCategory}
          handleSubmit={async (values, helpers) => {
            await handleUpload(values, helpers);
            setRenderForm(false);
          }}
          closeCallback={() => setRenderForm(false)}
        />
      )}
    </>
  );
};

interface EditableFileListProps {
  handleUpload: FormikSubmitHandler<FileUploadFormValues>;
  handleDelete: { (file: IFile): Promise<void> };
  handleDownload: { (file: IFile): void };
  items: FileItem[];
}

const EditableFileList = ({
  items,
  handleDelete,
  handleDownload,
  handleUpload,
}: EditableFileListProps) => {
  return (
    <FileListWrapper>
      {items.map((item) => (
        <EditableFileListItem
          key={item.fileCategory.value}
          fileCategory={item.fileCategory}
          value={item.value}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
        />
      ))}
    </FileListWrapper>
  );
};

export default EditableFileList;
