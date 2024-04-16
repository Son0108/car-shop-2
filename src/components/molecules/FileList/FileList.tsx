import { PaperClipIcon } from "@heroicons/react/solid";
import { FC, ReactNode } from "react";
import Button from "../../atoms/Button/Button";

export interface FileItem {
  name: string;
}

/**
 * Wrapper for all file-lists
 */
export const FileListWrapper: FC = ({ children }) => (
  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
    {children}
  </ul>
);

interface FileListItemProps {
  /**
   * name of the file
   */
  name: string;
  /**
   * actions for the file
   */
  actions?: ReactNode;
}

/**
 * List-item to render an item inside a file-list
 */
export const FileListItem = ({ name, actions }: FileListItemProps) => (
  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
    <div className="w-0 flex-1 flex items-center">
      <PaperClipIcon
        className="flex-shrink-0 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <span className="ml-2 flex-1 w-0 truncate">{name}</span>
    </div>
    {actions && <div className="ml-4 flex-shrink-0">{actions}</div>}
  </li>
);

interface DownloadableFileItem extends FileItem {
  handleDownload: { (): void };
}

interface FileListProps {
  files: DownloadableFileItem[];
}

const FileList = ({ files }: FileListProps) => (
  <FileListWrapper>
    {files.map((item) => (
      <FileListItem
        key={item.name}
        name={item.name}
        actions={
          <Button
            variant="text"
            size="sm"
            color="primary"
            onClick={item.handleDownload}
          >
            Download
          </Button>
        }
      />
    ))}
  </FileListWrapper>
);

export default FileList;
