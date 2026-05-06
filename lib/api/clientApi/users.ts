import type { User, UpdateUserPayload } from "@/types/user";
import { nextServer } from "@/lib/api/api";

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
}

export const updateUserAvatar = async (formData: FormData): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me/avatar", formData);
  return data;
};

export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
};

// =================ДОДАТКОВЕ-1===============================
// тимчасово прибрано: export const sendVerifyEmail = async (email: string): Promise<void> => {
//   await nextServer.post("/auth/send-verify-email", { email });
// };
