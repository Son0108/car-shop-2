export type Address = {
  id: string;
  city: string;
  country: string;
  postCode: string;
  street: string;
};

export type IAddressCreate = Omit<Address, "id">;
