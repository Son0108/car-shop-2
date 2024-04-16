import B64Utility from "../B64Utility";

export const JWT_NO_EXP_CLAIM =
  "No expiration claim found inside the token-payload";

function checkIfIsExpired(jwt: string): boolean {
  const encodedPayload = jwt.split(".")[1];
  const payload = JSON.parse(B64Utility.decode(encodedPayload));
  if (!payload.exp) {
    throw new Error(JWT_NO_EXP_CLAIM);
  }
  return payload.exp * 1000 < Date.now();
}

function getExpirationDate(jwt: string): Date {
  const encodedPayload = jwt.split(".")[1];
  const payload = JSON.parse(B64Utility.decode(encodedPayload));
  if (!payload.exp) {
    throw new Error(JWT_NO_EXP_CLAIM);
  }
  return new Date(payload.exp * 1000);
}

const JWTUtility = {
  checkIfIsExpired,
  getExpirationDate,
};

export default JWTUtility;
