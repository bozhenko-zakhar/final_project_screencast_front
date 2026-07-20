import { LoginRequest, RegisterRequest } from "@/types/auth";
import { nextServer } from "../api";
import { User } from "@/types/user";

export async function login(credentials: LoginRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/login', credentials);
  return res.data;
}

export async function register(credentials: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', credentials);
  return res.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}