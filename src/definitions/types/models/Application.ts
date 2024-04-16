import { RealEstate } from "./RealEstate";
import { TranslatedText } from "./TranslatedText";
import { User } from "./User";

/**
 * Status of an application
 */
export type ApplicationStatus =
  | "OPEN"
  | "ON_HOLD"
  | "TEMPORARY_ACCEPTED"
  | "ACCEPTED"
  | "DECLINED";

/**
 * Application for a realEstate by a user
 */
export interface Application {
  id: string;
  createdAt: string;
  status: TranslatedText<ApplicationStatus>;
  realEstate: RealEstate;
  starred: boolean;
}

export interface ApplicationWithUser extends Application {
  applicant: User;
}
