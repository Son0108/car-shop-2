import { User } from "../definitions/types/models/User";
import { ICreateBusinessAgentDTO } from "../definitions/types/DTOs/CreateBusinessAgentDTO";
import { ICreateIndividualAgentDTO } from "../definitions/types/DTOs/CreateIndividualAgentDTO";
import { ICreateTenantDTO } from "../definitions/types/DTOs/CreateTenantDTO";
import api from "../config/api/api";
import { IUpdatePasswordDTO } from "../definitions/types/DTOs/UpdatePasswordDTO";
import {
  FileCategoryValuesType,
  IFile,
} from "../definitions/types/models/File";
import { ProfileFormValues } from "../components/features/profile/forms/ProfileForm";

const UserService = () => ({
  createBusinessAgent: async (
    values: ICreateBusinessAgentDTO
  ): Promise<void> => {
    return api.post("/users/business-agent", values);
  },
  createIndividualAgent: async (values: ICreateIndividualAgentDTO) => {
    return api.post("/users/individual-agent", values);
  },
  createTenant: async (values: ICreateTenantDTO) => {
    return api.post("/users/tenant", values);
  },
  updateOwnUser: async (user: ProfileFormValues): Promise<User> => {
    const { data } = await api.put<User>("/users/own", user);

    if (!user.avatar) return data;

    const avatar = await UserService().uploadAvatar(user.avatar);

    return {
      ...data,
      avatar,
    };
  },
  updateOwnPassword: async (values: IUpdatePasswordDTO): Promise<void> => {
    await api.put("/users/own/password", values);
  },
  uploadAvatar: async (file: File): Promise<IFile> => {
    const formData = new FormData();
    formData.set("fileCategory", "AVATAR");
    formData.set("multipartFile", file);

    const { data: avatar } = await api.post<IFile>("/users/files", formData);
    return avatar;
  },
  uploadDocument: async (
    fileType: FileCategoryValuesType,
    file: File
  ): Promise<IFile> => {
    const formData = new FormData();
    formData.set("fileCategory", fileType);
    formData.set("multipartFile", file);

    const { data } = await api.post<IFile>("/users/files", formData);

    return data;
  },
  deleteDocument: async (fileName: string): Promise<void> => {
    await api.delete(`/users/files/${fileName}`);
  },
  completeProfile: async (): Promise<void> => {
    await api.put("/users/own/complete");
  },
});

export default UserService;
