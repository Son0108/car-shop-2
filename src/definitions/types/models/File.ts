import { TranslatedText } from "./TranslatedText";

export type UserFileType = "AVATAR";
export type TenantFileType = "CRIMINALREPORT" | "DEBTREPORT";
export type CompanyFileType = "COMPANYLOGO";
export type RealEstateFileType = "REALESTATEIMAGE";

export type FileCategoryValuesType =
  | UserFileType
  | TenantFileType
  | CompanyFileType
  | RealEstateFileType;

export type FileCategory = TranslatedText<FileCategoryValuesType>;

export interface IFile {
  name: string;
  originalName: string;
  mimeType: string;
  fileCategory: FileCategory;
}

export interface IFileCreate
  extends Omit<IFile, "name" | "originalName" | "mimeType"> {
  file: File;
}
