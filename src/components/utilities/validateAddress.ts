import axios from "axios";
import { IAddressCreate } from "../../definitions/types/models/Address";
import InvalidAddressException from "../../helpers/errors/InvalidAddressException";

// Validate an address and return the normalized address
async function validateAddress(
  address: IAddressCreate
): Promise<IAddressCreate> {
  try {
    const { data } = await axios.post<IAddressCreate>(
      "/api/address-verification",
      address
    );
    return data;
  } catch (e) {
    throw new InvalidAddressException();
  }
}

export default validateAddress;
