import type { User } from '@/types/user';
import { nextServer } from '@/lib/api/api'


export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
}


export const updateMe = async (data: Partial<User>) => {
  const response = await nextServer.patch('/users/me', data);
  return response.data;
};

export const updateAvatar = async (formData: FormData) => {
  const response = await nextServer.patch('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// =================ДОДАТКОВЕ-1===============================
// тимчасово прибрано: export const sendVerifyEmail = async (email: string): Promise<void> => {
//   await nextServer.post("/auth/send-verify-email", { email });
// };