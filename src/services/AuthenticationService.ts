import { UserFullyDressed } from "../definitions/types/models/User";
import api from "../config/api/api";

export interface ILoginResponse {
  jwt: string;
  data: UserFullyDressed;
}

const AuthenticationService = () => ({
  /**
   * Try to login with the given credentials and return a promi
   * @param email
   * @param password
   */
  login: async (email: string, password: string): Promise<ILoginResponse> => {
    const { headers, data } = await api.post<UserFullyDressed>(`/login`, {
      email,
      password,
    });
    const bearerToken = headers.authorization;
    const jwt = bearerToken.replace("Bearer ", "");
    return {
      jwt,
      data,
    };
  },
});

export default AuthenticationService;
