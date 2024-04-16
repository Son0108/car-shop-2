import { CompanyCreate } from "../models/Company";

export interface ICreateBusinessAgentDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  company: CompanyCreate;
}
