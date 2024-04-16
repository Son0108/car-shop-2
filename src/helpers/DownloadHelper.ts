import FileUtility from "../utilities/FileUtility";
import api from "../config/api/api";
import { isAPIError } from "../config/api/api-error";
import { handleAPIErrorResponse } from "./errors/APIErrorHandler";
import { IFile } from "../definitions/types/models/File";
import { NotifyFunction } from "../contexts/NotificationContext/NotificationContext";

/**
 * Download a blob on the client.
 * @param blob of the file that should be downloaded
 * @param fileName the downloaded should have when received by the client
 */
function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default downloadBlob;

/**
 * Download a document file on the client
 * @param file that should be downloaded
 * @param notify notification function used to communicate errors
 */
export async function downloadFile(
  file: IFile,
  notify: NotifyFunction
): Promise<void> {
  try {
    const url = FileUtility.getDocumentURL(file.name);
    const { data: fileBlob } = await api.get<Blob>(url, {
      responseType: "blob",
    });
    downloadBlob(fileBlob, file.originalName);
  } catch (err) {
    if (isAPIError(err)) {
      handleAPIErrorResponse(err, { notify });
    }
  }
}
