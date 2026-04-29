import { cookies } from "next/headers";
import { NextServer } from "./api";

import type { User } from "@/app/types/user";

export const getUser = async () => {
  const cookieStore = await cookies();

  const { data } = await NextServer.get<User>("users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
