import {
  RealEstate,
  RealEstateCreate,
  RealEstateUpdate,
} from "../definitions/types/models/RealEstate";
import api from "../config/api/api";
import { IFile } from "../definitions/types/models/File";

const RealEstateService = () => ({
  // Returns all real-estates owned by the current user.
  getOwnRealEstates: async (): Promise<RealEstate[]> => {
    const { data } = await api.get<RealEstate[]>("/real-estates/own");
    return data;
  },
  /**
   * Create a new real-estate for the active user
   * @param values form-data used to create the real-estate
   * @param image that should be uploaded for the real-estate
   */
  createRealEstate: async (
    values: RealEstateCreate,
    image?: File
  ): Promise<RealEstate> => {
    const { data } = await api.post<RealEstate>("/real-estates", values);

    if (!image) return data;

    const formData = new FormData();
    formData.set("fileCategory", "REALESTATEIMAGE");
    formData.set("multipartFile", image);

    const { data: realEstateImage } = await api.post<IFile>(
      `/real-estates/${data.id}/files`,
      formData
    );

    return {
      ...data,
      realEstateImage,
    };
  },
  /**
   * Update an existing real-estate owned by the active user
   * @param values form-data used to update the existing real-estate
   * @param image that should be uploaded for the real-estate
   */
  updateRealEstate: async (
    values: RealEstateUpdate,
    image?: File
  ): Promise<RealEstate> => {
    const { data } = await api.put<RealEstate>(
      `/real-estates/${values.id}`,
      values
    );

    if (!image) return data;

    const formData = new FormData();
    formData.set("fileCategory", "REALESTATEIMAGE");
    formData.set("multipartFile", image);

    const { data: realEstateImage } = await api.post<IFile>(
      `/real-estates/${data.id}/files`,
      formData
    );

    return {
      ...data,
      realEstateImage,
    };
  },
});

export default RealEstateService;
