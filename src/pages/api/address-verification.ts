import type { NextApiRequest, NextApiResponse } from "next";
import { IAddressCreate } from "../../definitions/types/models/Address";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Request must be of type post
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  // If values are missing return 400
  if (
    !req.body.street ||
    !req.body.postCode ||
    !req.body.city ||
    !req.body.country
  ) {
    res.status(400).end();
    return;
  }

  const rawAddress: IAddressCreate = req.body;
  let validatedAddress: IAddressCreate = rawAddress;

  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    // TODO: validate address against the google maps api
    // Tutorial: https://flow.ai/docs/guides/code/working-with-addresses#validating-the-address-with-the-google-api
    validatedAddress = {
      ...rawAddress,
    };
  }

  res.status(200).json(validatedAddress);
};
