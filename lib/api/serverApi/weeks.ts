import { nextServer } from "../api";
import { cookies } from "next/headers";
import type { BabyWeek } from "@/types/baby";
import { MomWeek } from "@/types/mom";

type BabyStateResponse = {
	babyState: BabyWeek
}

type MomStateResponse = {
	momState: MomWeek
}

export const getServerBabyState = async (weekNumber: number): Promise<BabyWeek> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<BabyStateResponse>("/weeks/baby-state", {
    params: {
      weekNumber,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.babyState;
};

export const getServerMomState = async (weekNumber: number): Promise<MomWeek>  => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<MomStateResponse>("/weeks/mom-state", {
    params: {
      weekNumber,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.momState;
};

export const getMomStateInfo = async (weekNumber: number): Promise<MomWeek> => {
	const res = await nextServer.get<MomStateResponse>("/weeks/mom-state", {
		params: { weekNumber },
	});

	return res.data.momState;
};

export const getBabyStateInfo = async (weekNumber: number): Promise<BabyWeek> => {
	const res = await nextServer.get<BabyStateResponse>("/weeks/baby-state", {
		params: { weekNumber },
	});

	return res.data.babyState;
};