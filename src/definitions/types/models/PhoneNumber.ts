export type PhoneNumber = {
  id: string;
  countryCode: string;
  phoneNumber: string;
};

export type PhoneNumberCreate = Omit<PhoneNumber, "id">;
