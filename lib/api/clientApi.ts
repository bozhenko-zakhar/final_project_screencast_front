import { NextClient } from "./api";
import type { User } from "@/app/types/user";
import type { UpdateUserPayload } from "@/app/types/user";

export const updateUserAvatar = async (formData: FormData): Promise<User> => {
  const { data } = await NextClient.patch<User>("/users/avatar", formData);
  return data;
};

export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await NextClient.patch<User>("/users", payload);
  return data;
};
