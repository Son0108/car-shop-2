import { RealEstate } from "../definitions/types/models/RealEstate";
import api from "../config/api/api";

const UserRealEstateService = () => ({
  getOwnUserRealEstates: async (): Promise<RealEstate[]> => {
    const { data } = await api.get<RealEstate[]>(
      "/users/own/users-real-estates"
    );
    return data;
  },
});

export default UserRealEstateService;
