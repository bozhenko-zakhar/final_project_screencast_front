import { User } from '@/app/types/user';
import { nextServer } from './api';
import type {
  LoginRequest,
  RegisterRequest,
} from '@/app/types/auth';



export async function login(credentials: LoginRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/login', credentials);
  return res.data;
}

export async function register(credentials: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', credentials);
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>('/user/me');
  return res.data;
}

export async function refreshSession() {
  const res = await nextServer.post('/auth/refresh');
  return res.data;
}