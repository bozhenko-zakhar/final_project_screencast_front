import { nextServer } from "../api";
import { cookies } from "next/headers";
import type { BabyWeek } from "@/types/baby";

export const getServerBabyState = async (weekNumber: number) => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<BabyWeek>("/weeks/baby-state", {
    params: {
      weekNumber,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerMomState = async (weekNumber: number) => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get("/weeks/mom-state", {
    params: {
      weekNumber,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

