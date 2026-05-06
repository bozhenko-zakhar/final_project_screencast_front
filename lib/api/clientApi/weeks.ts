import { BabyWeek } from "@/types/baby";
import { nextServer } from "../api";
import { MomWeek } from "@/types/mom";

type PublicWeeksResponse = {
	daysLeft: number,
	babyState: BabyWeek
}

type PrivateWeeksResponse = {
	daysLeft: number,
	babyState: BabyWeek
}

type BabyStateResponse = {
	babyState: BabyWeek
}

type MomStateResponse = {
	momState: MomWeek
}

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

export const fetchPublicWeeks = async (): Promise<PublicWeeksResponse> => {
  const res = await nextServer.get<PublicWeeksResponse>("/weeks/public");
  return res.data;
};

export const fetchPrivateWeeks = async (): Promise<PrivateWeeksResponse> => {
  const res = await nextServer.get<PrivateWeeksResponse>("/weeks/private");
  return res.data;
};
