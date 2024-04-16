import { Address } from "./Address";
import { PhoneNumber } from "./PhoneNumber";
import { Role } from "./Role";
import { Company } from "./Company";
import { Activity } from "./Activity";
import { IFile } from "./File";
import { Gender } from "./Gender";

export interface User {
  id: string;
  email: string;
  gender: Gender;
  birthDate: string;
  firstName: string;
  lastName: string;
  address: Address | null;
  phoneNumber: PhoneNumber | null;
  company: Company | null;
  avatar: IFile | null;
  files: IFile[];
}

export type UserStatus =
  | "COMPLETE"
  | "INCOMPLETE"
  | "UNVERIFIED_EMAIL"
  | "UNVERIFIED_PHONE";

export interface UserFullyDressed extends User {
  roles: Role[];
  activities: Activity[];
  status: UserStatus;
}

export interface UserUpdate
  extends Omit<
    User,
    "address" | "avatar" | "company" | "gender" | "files" | "phoneNumber"
  > {
  address: Address | null;
  avatar: File | null;
  company: Company | null;
  gender: string;
  phoneNumber: PhoneNumber | null;
}
