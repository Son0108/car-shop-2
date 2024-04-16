import { IAddressCreate } from "../models/Address";
import { PhoneNumberCreate } from "../models/PhoneNumber";

export interface ICreateTenantDTO {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  gender: string;
  birthDate: string;
  address: IAddressCreate;
  phoneNumber: PhoneNumberCreate;
}
