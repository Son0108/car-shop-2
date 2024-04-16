import { PhoneNumber, PhoneNumberCreate } from "./PhoneNumber";
import { Address, IAddressCreate } from "./Address";

export type Company = {
  address: Address;
  companyName: string;
  legalFormCategory: string;
  phoneNumber: PhoneNumber;
};

export type CompanyCreate = {
  address: IAddressCreate;
  phoneNumber: PhoneNumberCreate;
  companyName: string;
  legalFormCategory: string;
};
