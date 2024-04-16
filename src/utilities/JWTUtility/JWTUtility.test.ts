import JWTUtility, { JWT_NO_EXP_CLAIM } from "./JWTUtility";

function encodeB64(value: string): string {
  return Buffer.from(value).toString("base64");
}

describe("JWTUtility test-suite", () => {
  function constructMockJWT(payload: { [key: string]: any } = {}) {
    const mockHeader = {
      alg: "HS512",
    };
    const mockSignature =
      "hYsChM6SzGq_Z4IW9li1dic8wOJBBtcYGeJuae2Lalaty2VvI6UvHDoYgoHYK8UXNqScRG4QC85EZ9KkYlZcNA";
    return `${encodeB64(JSON.stringify(mockHeader))}.${encodeB64(
      JSON.stringify(payload)
    )}.${mockSignature}`;
  }

  it("should show jwt as expired", () => {
    const expirationTime = Math.floor((Date.now() - 1000) / 1000);
    const mockJWT = constructMockJWT({ exp: expirationTime });
    expect(JWTUtility.checkIfIsExpired(mockJWT)).toBeTruthy();
  });

  it("should not show jwt as expired", () => {
    const expirationTime = Math.floor((Date.now() + 1000000) / 1000);
    const mockJWT = constructMockJWT({ exp: expirationTime });
    expect(JWTUtility.checkIfIsExpired(mockJWT)).toBeFalsy();
  });

  it("should throw error when checking expiration", () => {
    const mockJWT = constructMockJWT();
    expect(() => JWTUtility.checkIfIsExpired(mockJWT)).toThrow(
      JWT_NO_EXP_CLAIM
    );
  });
});
