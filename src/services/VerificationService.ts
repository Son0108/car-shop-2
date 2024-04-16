import api from "../config/api/api";

const VerificationService = () => ({
  requestNewVerificationEmail: async (email: string): Promise<void> => {
    await api.put("/verifications/renew", {
      email,
      verificationCategory: "EMAIL",
    });
  },
  verifyEmail: async (token: string): Promise<void> => {
    await api.put(`/verifications/${token}`);
  },
});

export default VerificationService;
