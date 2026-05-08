import { cookies } from "next/headers";
import type { User } from "@/types/user";
import { api } from "@/app/api/api";

export const getServerUser = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};