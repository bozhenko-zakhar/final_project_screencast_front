import { User } from '@/types/user';
import { NextServer } from '@/lib/api/api'
import type {
  LoginRequest,
  RegisterRequest,
} from '@/app/types/auth';



export async function login(credentials: LoginRequest): Promise<User> {
  const res = await NextServer.post<User>('/auth/login', credentials);
  return res.data;
}

export async function register(credentials: RegisterRequest): Promise<User> {
  const res = await NextServer.post<User>('/auth/register', credentials);
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await NextServer.get<User>('/users/me');
  return res.data;
}

export async function refreshSession() {
  const res = await NextServer.post('/auth/refresh');
  return res.data;
}
import type { UpdateUserPayload } from "@/app/types/user";

export const updateUserAvatar = async (formData: FormData): Promise<User> => {
  const { data } = await NextServer.patch<User>("/users/avatar", formData);
  return data;
};

export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await NextServer.patch<User>("/users", payload);
  return data;
};

// =================ДОДАТКОВЕ-1===============================
export const sendVerifyEmail = async (email: string): Promise<void> => {
  await NextServer.post("/auth/send-verify-email", { email });
};