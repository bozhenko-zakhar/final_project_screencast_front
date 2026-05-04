import { nextServer } from "../api";
import type { User } from "@/types/user";
import { cookies } from "next/headers";

export const getServerUser = async () => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
