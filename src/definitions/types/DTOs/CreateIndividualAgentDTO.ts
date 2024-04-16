import { IAddressCreate } from "../models/Address";
import { PhoneNumberCreate } from "../models/PhoneNumber";

export interface ICreateIndividualAgentDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: IAddressCreate;
  phoneNumber: PhoneNumberCreate;
}
