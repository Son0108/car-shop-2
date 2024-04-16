class FileUtility {
  private static url: string = process.env.NEXT_PUBLIC_FILE_API_HOST || "";

  private static BYTE_UNITS: readonly string[] = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
  ];

  /**
   * Get an absolute url needed to retrieve a document from the backend
   * @param name of the document
   */
  public static getDocumentURL(name: string): string {
    return `${FileUtility.url}/documents/${name}`;
  }

  /**
   * Get a human readable file-size string
   * @param size of a file in bytes
   */
  public static getReadableSize(size: number): string {
    if (size === 0) {
      return "0.00 B";
    }
    const exponent = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / 1024 ** exponent).toFixed(2)} ${
      this.BYTE_UNITS[exponent]
    }`;
  }

  /**
   * Get the absolute url needed to retrieve an image file from the backend.
   * @param name of the file
   */
  public static getImageURL(name: string): string {
    return `${FileUtility.url}/images/${name}`;
  }
}

export default FileUtility;
