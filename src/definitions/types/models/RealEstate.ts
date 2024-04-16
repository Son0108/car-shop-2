import { Address, IAddressCreate } from "./Address";
import { User } from "./User";
import { IFile } from "./File";
import { TranslatedText } from "./TranslatedText";

export type RealEstateStatus = "OPEN" | "ON_HOLD" | "CLOSED";

export interface RealEstate {
  id: string;
  name: string;
  space: number;
  rooms: number;
  netRent: number;
  grossRent: number;
  realEstateReferenceLink: string;
  status: TranslatedText<RealEstateStatus>;
  address: Address;
  realEstateImage: IFile;
  agent: User;
  published: boolean;
}

export type RealEstateUpdate = Omit<
  RealEstate,
  "status" | "realEstateImage" | "agent"
>;

export interface RealEstateCreate
  extends Omit<RealEstateUpdate, "id" | "address"> {
  address: IAddressCreate;
}

export interface RealEstatePublished {
  published: boolean;
}
