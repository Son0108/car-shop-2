import { Authority } from "./Authority";

export type Role = {
  name: string;
  authorities: Authority[];
};
